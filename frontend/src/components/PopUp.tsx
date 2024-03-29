import { useState } from "react"
import axios from "axios";

type PopUpProps = {
    onClose:any, //mudar tipo depois
    setData:any
}

/**
 * Server's Path
 * @type {String}
 */
const SERVER = "http://localhost:3001";

const PopUp = ({onClose,setData} : PopUpProps) => {

    const [formData,setFormData] = useState<{localFile:File | null, remoteFile:string}>({localFile:null,remoteFile:""})

        /**
     * Recebe um ficheiro .csv local ou o url de um ficheiro csv remoto.
     *
     * Se existir um .csv local e um url ao mesmo tempo vai dar prioridade ao ficheiro local,
     * caso contrário faz um chamada a API para ir buscar o ficheiro .csv.
     *
     * Formata corretamente o ficheiro .CSV num [{...}, {...}, ...] e chama a função
     * "setData(file)" que irá atualizar os dados no tabulator.
     * Limpa os inputs e depois fecha o popUp de upload.
     *
     * Example remote URL: https://raw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeExemplo.csv
     *
     * Example local URL: ./Software-Engineering/front-end/others/HorarioDeExemplo.csv
     *
     * See {@link setData}.
     * @param {Event} event - Evento para dar prenvent do ação do forms e recolher o mesmo
     * @param {Function} [handleData] - Função a executar após a transformação do ficheiro
     */
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>, handleData = setData) {
        if (!event) return;
        event.preventDefault();

        const {remoteFile,localFile} = formData;
    
        if (remoteFile === "" && !localFile) return "Forms não preenchido.";
    
        setFormData({localFile:null,remoteFile:""}); //Reset Form
        onClose();
    
        if (needToDownloadCsv(localFile, remoteFile)) {
        return axios
            .post(`${SERVER}/uploadHorario`, {
            url: remoteFile,
            })
            .then((r) => formatCsv(r.data.csvData))
            .then((file) => handleData(file))
            .catch((e) =>
            e.response?.data
                ? JSON.stringify(e.response.data)
                : "Não conseguiu conectar-se ao servidor."
            );
        } else {
        return formatToString(localFile!)
            .then((formatedFile) => formatCsv(formatedFile))
            .then((file) =>  handleData(file));
        }
    }

    /**
     * Verifica se precisa de fazer a chamada a API para fazer download do ficheiro.
     *
     * Propriedades: Nesta função dá-se prioridade ao ficheiro local, ou seja, se ambos os campos
     * estiverem preenchidos apenas vai buscar o ficheiro local.
     * @param {File} localFile - Ficheiro .CSV local
     * @param {String} remoteFile - URL do ficheiro .CSV remoto
     * @returns {Boolean} - Boolean para saber se é preciso fazer download do ficheiro .CSV
     */
     function needToDownloadCsv(localFile:File | null, remoteFile:string) : boolean {
        return (
        (localFile?.type == "application/octet-stream" || localFile?.size == 0) &&
        remoteFile !== null &&
        remoteFile !== ""
        );
    }
    /**
     * Recebe um ficheiro e transforma-o em string.
     * @param {File} localFile - Ficheiro .CSV local
     * @returns {String} - Local File em string
     */
    async function formatToString(localFile : File) {
        const text = await localFile.text();
        return text;
    }
  
  /**
   * Recebe em texto um ficheiro .csv e transforma-o num array de json's, [{...}, {...}, ...].
   *
   * Assume-se que existe headers no texto passado.
   * Se conter ";" no header, assume-se uma separação de linhas com ";",
   * caso contrário usa-se o delimitador ",".
   * Se existir alguma linha sem dados ignora-a não devolvendo-a no Array<JSON>.
   * @param {String} text - Ficheiro de texto do .CSV
   * @param {Boolean} [enableHeaders] - (opcional) o ficheiro enviado tem headers, por default tem.
   * @returns {Array<JSON>} - Formated .CSV File
   */
  function formatCsv(text: string, enableHeaders: boolean = true): object[] {
    const splitedText: string[] = text.split(new RegExp("\r\n|\n|\r"));
    const delimiter: string =
      splitedText.length > 0 && splitedText[0].includes(";") ? ";" : ",";
  
    const headers: string[] = enableHeaders
      ? splitedText[0].split(delimiter)
      : splitedText[0].split(delimiter).map((_element, index) => index.toString());
  
    const dataRows: string[] = splitedText.slice(1).filter((row) => row.length != 0);
  
    return dataRows.map((linha) =>
      linha.split(delimiter).reduce((json: any, currentCell: string, coluna: number) => {
        json[headers[coluna]] = currentCell;
        return json;
      }, {})
    );
  } 
    


  return (
    <section id="PopUpUpload">
        <script type="module" src="js/uploadCsv.js"></script>
        <div>
            <button onClick={onClose} id="ClosePopUp"></button>
            <h3>UPLOAD .CSV</h3>
            <form id="localUpload" onSubmit={e => handleSubmit(e)} method="post">
                <input name="localFile" onChange={(e) => setFormData({...formData,localFile:e.target.files ? e.target.files[0] : null})}  type="file" multiple accept=".csv"/>
                <h6 className="line-border">or</h6>

                <input name="remoteFile" value={formData.remoteFile} onChange={(e) => setFormData({...formData,remoteFile:e.target.value})} type="text" id="fileInput"/>


                <button type="submit">UPLOAD</button>
            </form>
        </div>
    </section>
  )
}

export default PopUp