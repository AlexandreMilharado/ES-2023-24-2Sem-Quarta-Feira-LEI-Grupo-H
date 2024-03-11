"use-strict";
import axios from "axios";

const localForm = document.getElementById("localUpload");
localForm.addEventListener("submit", handleSubmit);

/** @param {Event} event */
async function handleSubmit(event) {
  event.preventDefault(); // Colocar comentário para testar
  const form = event.currentTarget;
  const { localFile, remoteFile } = formDataToJson(new FormData(form));

  if (needToDownloadCsv(localFile, remoteFile)) {
    //Example URL:https://raw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeExemplo.csv
    axios
      .post("http://localhost:3001/uploadHorario", {
        file: remoteFile,
      })
      .then((r) => formatCsv(r.data.csvData))
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  } else {
    format(localFile);
  }
}

function formDataToJson(formData) {
  const json = {};
  formData.forEach((value, key) => {
    json[key] = value;
  });
  return json;
}

function needToDownloadCsv(localFile, remoteFile) {
  return (
    localFile?.type == "application/octet-stream" &&
    remoteFile !== null &&
    remoteFile !== ""
  );
}

async function format(localFile) {
  const text = await localFile.text();
  formatCsv(text);
}

function formatCsv(text) {
  const newArr = text.split("\n").map((linha) => linha.split(";"));
  console.log(newArr);
}
