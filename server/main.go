package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/hyperledger/fabric-sdk-go/pkg/core/config"
	"github.com/hyperledger/fabric-sdk-go/pkg/gateway"
)

func main() {
	log.Println("Initializing Ashvini API Server...")
	os.Setenv("DISCOVERY_AS_LOCALHOST", "true")

	http.HandleFunc("/api/batches", batchesHandler)
	http.HandleFunc("/api/batches/", batchDetailHandler)
	http.HandleFunc("/api/journey/", journeyHandler)

	log.Println("Server is running on http://localhost:8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

func batchDetailHandler(w http.ResponseWriter, r *http.Request) {
	pathParts := strings.Split(r.URL.Path, "/")
	batchID := pathParts[3]

	if len(pathParts) > 4 { // e.g., /api/batches/ID/process
		action := pathParts[4]
		if r.Method == "POST" {
			switch action {
			case "process":
				addProcessingStep(w, r, batchID)
				return
			case "test":
				addLabTest(w, r, batchID)
				return
			}
		}
	} else if r.Method == "GET" {
		getBatchByID(w, r, batchID)
		return
	}

	http.Error(w, "Invalid Request", http.StatusBadRequest)
}

func batchesHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		createHarvestEvent(w, r)
	} else {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func journeyHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		getAssetHistory(w, r)
	} else {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func getBatchByID(w http.ResponseWriter, r *http.Request, batchID string) {
	log.Printf("--- API: Get Batch By ID: %s ---\n", batchID)
	contract, gateway, err := connectToContract()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	defer gateway.Close()

	result, err := contract.EvaluateTransaction("ReadBatch", batchID)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get asset: %v", err), 500)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(result)
}

func createHarvestEvent(w http.ResponseWriter, r *http.Request) {
	log.Println("--- API: Create Harvest Event ---")
	var data map[string]string
	json.NewDecoder(r.Body).Decode(&data)

	contract, gateway, err := connectToContract()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	defer gateway.Close()

	batchId := fmt.Sprintf("%s-%d", data["herbName"], time.Now().Unix())

	_, err = contract.SubmitTransaction("CreateCollectionEvent", batchId, data["herbName"], data["farmerId"], data["farmerName"], data["harvestDate"], data["harvestLocation"], data["initialQuantity"], data["photoUrl"])
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to create asset: %v", err), 500)
		return
	}
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(fmt.Sprintf("{\"batchId\": \"%s\"}", batchId)))
}

func addProcessingStep(w http.ResponseWriter, r *http.Request, batchID string) {
	log.Printf("--- API: Add Processing Step to %s ---\n", batchID)
	var data map[string]string
	json.NewDecoder(r.Body).Decode(&data)

	contract, gateway, err := connectToContract()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	defer gateway.Close()

	_, err = contract.SubmitTransaction("AddProcessingStep", batchID, data["processorId"], data["processorName"], data["processDate"], data["location"], data["description"], data["photoUrl"])
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to add processing step: %v", err), 500)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("{\"message\": \"Processing step added successfully\"}"))
}

func addLabTest(w http.ResponseWriter, r *http.Request, batchID string) {
	// Implementation for adding a lab test would follow the same pattern as addProcessingStep
	http.Error(w, "Not yet implemented", 501)
}

func getAssetHistory(w http.ResponseWriter, r *http.Request) {
	batchID := strings.TrimPrefix(r.URL.Path, "/api/journey/")
	log.Printf("--- API: Get Asset History for: %s ---\n", batchID)
	contract, gateway, err := connectToContract()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	defer gateway.Close()

	result, err := contract.EvaluateTransaction("GetAssetHistory", batchID)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get asset history: %v", err), 500)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(result)
}

// --- HELPER FUNCTIONS ---

func connectToContract() (*gateway.Contract, *gateway.Gateway, error) {
	walletPath := "/mnt/c/Users/Shreshth/Desktop/ashvini/server/wallet"
	ccpPath := "/mnt/c/Users/Shreshth/Desktop/ashvini_dev/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json"
	identityLabel := "Org1Admin"

	wallet, err := gateway.NewFileSystemWallet(walletPath)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to create wallet: %w", err)
	}
	if !wallet.Exists(identityLabel) {
		if err := populateWallet(wallet); err != nil {
			return nil, nil, err
		}
	}

	gw, err := gateway.Connect(gateway.WithConfig(config.FromFile(filepath.Clean(ccpPath))), gateway.WithIdentity(wallet, identityLabel))
	if err != nil {
		return nil, nil, fmt.Errorf("failed to connect to gateway: %w", err)
	}
	network, err := gw.GetNetwork("mychannel")
	if err != nil {
		return nil, nil, fmt.Errorf("failed to get network: %w", err)
	}
	contract := network.GetContract("ashvini-chaincode")
	return contract, gw, nil
}

func populateWallet(wallet *gateway.Wallet) error {
	log.Println("Populating wallet with Org1Admin identity...")
	credPath := "/mnt/c/Users/Shreshth/Desktop/ashvini_dev/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp"
	certPath := filepath.Join(credPath, "signcerts", "Admin@org1.example.com-cert.pem")
	cert, err := ioutil.ReadFile(filepath.Clean(certPath))
	if err != nil {
		return err
	}
	keyDir := filepath.Join(credPath, "keystore")
	files, err := ioutil.ReadDir(keyDir)
	if err != nil || len(files) == 0 {
		return err
	}
	keyPath := filepath.Join(keyDir, files[0].Name())
	key, err := ioutil.ReadFile(filepath.Clean(keyPath))
	if err != nil {
		return err
	}
	identity := gateway.NewX509Identity("Org1MSP", string(cert), string(key))
	return wallet.Put("Org1Admin", identity)
}
