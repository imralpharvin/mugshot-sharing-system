package main

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	sc "github.com/hyperledger/fabric-protos-go/peer"

)

type PoliceDepartmentContract struct {
}

//Account Struct
type PoliceDepartment struct {
	ObjectType		string  `json:"docType"`
	Name 					string 	`json:"name"`
  DepartmentID  int 		`json:"departmentID"`
	Hash 					string 	`json:"hash"`
}

func (s *PoliceDepartmentContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

func (s *PoliceDepartmentContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {
	function, args := APIstub.GetFunctionAndParameters()

	switch function {
	case "CreatePoliceDepartment":
		return s.CreatePoliceDepartment(APIstub, args)
	case "QueryPoliceDepartment":
		return s.QueryPoliceDepartment(APIstub, args)
	case "QueryPoliceDepartmentByID":
		return s.QueryPoliceDepartmentByID(APIstub, args)
	case "QueryAllPoliceDepartments":
		return s.QueryAllPoliceDepartments(APIstub)
	default:
		return shim.Error("Invalid Smart Contract function name.")
	}
}

func (s *PoliceDepartmentContract) CreatePoliceDepartment(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

  if len(args) != 3 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	departmentIDint, err := strconv.Atoi(args[1])
	if err == nil {
		fmt.Println(departmentIDint)
	}
	policedepartment := PoliceDepartment{
		ObjectType: "policedepartment",
		Name:  args[0],
    DepartmentID: departmentIDint,
		Hash:  args[2],

	}

	policedepartmentAsBytes, _ := json.Marshal(policedepartment)
	APIstub.PutState(args[0], policedepartmentAsBytes)

	return shim.Success(policedepartmentAsBytes)
}

func (s *PoliceDepartmentContract) QueryPoliceDepartment(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
  if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	policedepartmentAsBytes, _ := APIstub.GetState(args[0])
	return shim.Success(policedepartmentAsBytes)
}

func (s *PoliceDepartmentContract) QueryPoliceDepartmentByID(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	departmentID := strings.ToLower(args[0])

	queryString := fmt.Sprintf("{\"selector\":{\"docType\":\"policedepartment\",\"departmentID\":%s}}", departmentID)

	queryResults, err := getQueryResultForQueryString(APIstub, queryString)
	if err != nil {
		return shim.Error(err.Error())
	}
	return shim.Success(queryResults)
}

func (s *PoliceDepartmentContract) QueryAllPoliceDepartments(APIstub shim.ChaincodeStubInterface) sc.Response {

	queryString := fmt.Sprintf("{\"selector\":{\"docType\":\"policedepartment\"}}")

	queryResults, err := getQueryResultForQueryString(APIstub, queryString)
	if err != nil {
		return shim.Error(err.Error())
	}
	return shim.Success(queryResults)
}

func main() {

	// Create a new Smart Contract
	err := shim.Start(new(PoliceDepartmentContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
