import { useState } from "react";
import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import "./index.css";
import PopUp from "./components/PopUp";
import { ReactTabulator } from "react-tabulator";

function App() {
  const [popUpShow, setPopUpShow] = useState(true);
  const [data, setData] = useState([{ Message: "Dados ainda não inseridos" }]);

  return (
    <>
      <Header />
      <HeroBanner onUploadClick={() => setPopUpShow(true)} />
      {popUpShow && (
        <PopUp setData={setData} onClose={() => setPopUpShow(false)} />
      )}
      <ReactTabulator
        data={data}
        layout="fitDataFill"
        columns={[]}
        options={{
          pagination: "local",
          paginationSize: 10,
          paginationSizeSelector: [5, 10, 20, 40],
          movableColumns: false,
          autoColumns: true,
          autoColumnsDefinitions: function (definitions:any) {
            // Adicionar Filtros no Tabulator
            definitions.forEach((column:any) => {
              column.headerFilter = true;
            });
            return definitions;
          }
        }}
      />
    </>
  );
}

export default App;
