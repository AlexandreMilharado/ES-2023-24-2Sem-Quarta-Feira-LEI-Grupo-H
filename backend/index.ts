import express, { Express, Request, Response } from "express";
import cors from "cors";
import axios, { AxiosResponse } from "axios";

const app: Express = express();
app.use(express.json());
app.use(cors({ origin: true }));

/**
 * EndPoint para fazer upload do Horario através do url passado no body,
 * faz download do ficheiro e envia para o cliente.
 */
app.post("/uploadHorario", async (req: Request, res: Response) => {
	const { url } = req.body;
	try {
		const csvData: string = await getFile(url);
		return res.json({ csvData });
	} catch (error) {
		return res.status(500).json({ error: "Failed to fetch CSV/JSON file" });
	}
});

/**
 * Faz download do .csv ou .json e retorna-o como string.
 * @param {string} url
 * @returns {Promise<string>} Dados do ficheiro de dados.
 */
async function getFile(url: string): Promise<string> {
	if (!(url.endsWith(".csv") || url.endsWith(".json"))) throw Error();

	const response: AxiosResponse = await axios.get(url, {
		responseType: "text",
	});
	return response.data;
}

// Escuta na porta:3001
app.listen(3001);
