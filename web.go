package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type DHT11Response struct {
	Temperature int64 `json:"temperature"`
	Humidity    int64 `json:"humidity"`
}

type DS18B20Response struct {
	Temperature float32 `json:"temperature"`
}

type BreathalyzerResponse struct {
	AlcoholDetected bool `json:"alcoholDetected"`
}

func dht11Handler(w http.ResponseWriter, r *http.Request) {
	dht11Response := new(DHT11Response)

	resp, err := http.Get("http://dht-server.default.svc.cluster.local:3000/dht11")
	if err != nil {
		fmt.Fprintf(w, "Error durring temperature polling: %s", err.Error())
		return
	}

	err = json.NewDecoder(resp.Body).Decode(dht11Response)
	if err != nil {
		fmt.Fprintf(w, "Error during server response decoding: %s", err.Error())
		return
	}

	log.Println(dht11Response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(dht11Response)
}

func ds18b20Handler(w http.ResponseWriter, r *http.Request) {
	ds18b20Response := new(DS18B20Response)

	resp, err := http.Get("http://dht-server.default.svc.cluster.local:3000/ds18b20")
	if err != nil {
		fmt.Fprintf(w, "Error durring temperature polling: %s", err.Error())
		return
	}

	err = json.NewDecoder(resp.Body).Decode(ds18b20Response)
	if err != nil {
		fmt.Fprintf(w, "Error during server response decoding: %s", err.Error())
		return
	}

	log.Println(ds18b20Response)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ds18b20Response)
}

func breathalyzerHandler(w http.ResponseWriter, r *http.Request) {
	breathalyzerResponse := new(BreathalyzerResponse)

	resp, err := http.Get("http://breathalyzer.default.svc.cluster.local:3000/mq3/measure")
	if err != nil {
		fmt.Fprintf(w, "Error durring breathalyzer polling: %s", err.Error())
		return
	}

	err = json.NewDecoder(resp.Body).Decode(breathalyzerResponse)
	if err != nil {
		fmt.Fprintf(w, "Error during server response decoding: %s", err.Error())
		return
	}

	log.Println(breathalyzerResponse)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(breathalyzerResponse)
}

func main() {
	fs := http.FileServer(http.Dir(""))
	http.Handle("/", fs)

	log.Println("Listening...")

	http.HandleFunc("/dht11", dht11Handler)
	http.HandleFunc("/ds18b20", ds18b20Handler)
	http.HandleFunc("/breathalyzer", breathalyzerHandler)
	err := http.ListenAndServe(":80", nil)
	if err != nil {
		log.Println(err)
	}
}
