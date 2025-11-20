package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

func CargarApi(api string) string {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error cargando el archivo .env: %v", err)
	}

	clave_api := os.Getenv(api)

	return clave_api
}

func main() {

	// cargar api key
	apikey := CargarApi("api_mail")

	url := "https://send.api.mailtrap.io/api/send"
	method := "POST"

	payload := strings.NewReader(`{
		"from": {"email":"hello@innovaccounting.com.co","name":"Mailtrap Test"},
		"to": [{"email":"jy87287@gmail.com"}],
		"subject": "You are awesome!",
		"text": "Congrats for sending test email with Mailtrap!",
		"category": "Integration Test"
	}`)

	client := &http.Client{}
	req, err := http.NewRequest(method, url, payload)
	if err != nil {
		fmt.Println(err)
		return
	}

	// Usar la API key cargada desde .env
	req.Header.Add("Authorization", "Bearer "+apikey)
	req.Header.Add("Content-Type", "application/json")

	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(string(body))

}
