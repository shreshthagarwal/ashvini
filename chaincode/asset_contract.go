package main

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing an Asset
type SmartContract struct {
	contractapi.Contract
}

// ProcessingStep stores details of a processing event
type ProcessingStep struct {
	ProcessorID   string `json:"processorId"`
	ProcessorName string `json:"processorName"`
	ProcessDate   string `json:"processDate"`
	Location      string `json:"location"`
	Description   string `json:"description"`
	PhotoURL      string `json:"photoUrl"`
}

// LabTest stores details of a lab test event
type LabTest struct {
	LabID              string `json:"labId"`
	LabName            string `json:"labName"`
	TestDate           string `json:"testDate"`
	VerificationStatus string `json:"verificationStatus"`
	Summary            string `json:"summary"`
	TestReportURL      string `json:"testReportUrl"`
}

// Batch is the main asset, representing a batch of herbs
type Batch struct {
	BatchID           string           `json:"batchId"`
	HerbName          string           `json:"herbName"`
	Status            string           `json:"status"`
	CurrentOwner      string           `json:"currentOwner"`
	FarmerID          string           `json:"farmerId"`
	FarmerName        string           `json:"farmerName"`
	HarvestDate       string           `json:"harvestDate"`
	HarvestLocation   string           `json:"harvestLocation"`
	InitialQuantity   string           `json:"initialQuantity"`
	PhotoURL          string           `json:"photoUrl"`
	ProcessingHistory []ProcessingStep `json:"processingHistory"`
	LabTests          []LabTest        `json:"labTests"`
}

// CreateCollectionEvent creates a new batch on the ledger
func (s *SmartContract) CreateCollectionEvent(ctx contractapi.TransactionContextInterface, batchId string, herbName string, farmerId string, farmerName string, harvestDate string, harvestLocation string, initialQuantity string, photoUrl string) error {
	exists, err := s.AssetExists(ctx, batchId)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the asset %s already exists", batchId)
	}

	batch := Batch{
		BatchID:           batchId,
		HerbName:          herbName,
		Status:            "HARVESTED",
		CurrentOwner:      farmerId,
		FarmerID:          farmerId,
		FarmerName:        farmerName,
		HarvestDate:       harvestDate,
		HarvestLocation:   harvestLocation,
		InitialQuantity:   initialQuantity,
		PhotoURL:          photoUrl,
		ProcessingHistory: []ProcessingStep{},
		LabTests:          []LabTest{},
	}
	batchJSON, err := json.Marshal(batch)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(batchId, batchJSON)
}

// AddProcessingStep adds a new processing event to a batch's history
func (s *SmartContract) AddProcessingStep(ctx contractapi.TransactionContextInterface, batchId string, processorId string, processorName string, processDate string, location string, description string, photoUrl string) error {
	batch, err := s.ReadBatch(ctx, batchId)
	if err != nil {
		return err
	}

	newStep := ProcessingStep{
		ProcessorID:   processorId,
		ProcessorName: processorName,
		ProcessDate:   processDate,
		Location:      location,
		Description:   description,
		PhotoURL:      photoUrl,
	}

	batch.ProcessingHistory = append(batch.ProcessingHistory, newStep)
	batch.Status = "IN_PROCESS"
	batch.CurrentOwner = processorId

	batchJSON, err := json.Marshal(batch)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(batchId, batchJSON)
}

// AddLabTest adds a new lab test result to a batch's history
func (s *SmartContract) AddLabTest(ctx contractapi.TransactionContextInterface, batchId string, labId string, labName string, testDate string, status string, summary string, reportUrl string) error {
	batch, err := s.ReadBatch(ctx, batchId)
	if err != nil {
		return err
	}

	newTest := LabTest{
		LabID:              labId,
		LabName:            labName,
		TestDate:           testDate,
		VerificationStatus: status,
		Summary:            summary,
		TestReportURL:      reportUrl,
	}

	batch.LabTests = append(batch.LabTests, newTest)
	batch.Status = fmt.Sprintf("TESTED_%s", status)
	batch.CurrentOwner = labId

	batchJSON, err := json.Marshal(batch)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(batchId, batchJSON)
}

// ReadBatch returns the current state of a batch
func (s *SmartContract) ReadBatch(ctx contractapi.TransactionContextInterface, batchId string) (*Batch, error) {
	batchJSON, err := ctx.GetStub().GetState(batchId)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if batchJSON == nil {
		return nil, fmt.Errorf("the asset %s does not exist", batchId)
	}

	var batch Batch
	err = json.Unmarshal(batchJSON, &batch)
	if err != nil {
		return nil, err
	}

	return &batch, nil
}

// GetAssetHistory returns the full history of changes for an asset
func (s *SmartContract) GetAssetHistory(ctx contractapi.TransactionContextInterface, assetId string) ([]string, error) {
	resultsIterator, err := ctx.GetStub().GetHistoryForKey(assetId)
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	var records []string
	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}
		records = append(records, string(response.Value))
	}
	return records, nil
}

// AssetExists returns true when asset with given ID exists in world state
func (s *SmartContract) AssetExists(ctx contractapi.TransactionContextInterface, assetId string) (bool, error) {
	assetJSON, err := ctx.GetStub().GetState(assetId)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}

	return assetJSON != nil, nil
}

// main function starts the chaincode
func main() {
	assetChaincode, err := contractapi.NewChaincode(&SmartContract{})
	if err != nil {
		log.Panicf("Error creating chaincode: %v", err)
	}

	if err := assetChaincode.Start(); err != nil {
		log.Panicf("Error starting chaincode: %v", err)
	}
}
