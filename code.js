
var selectedFile;
var excelInput = document.getElementById("excelFile");
var templateInput = document.getElementById("tempalteFile");
var confirmButton = document.getElementById("uploadFiles")
var imgData  = ""

excelInput.addEventListener("change", function(e){
    selectedFile = e.target.files[0];
});

templateInput.addEventListener("change", function(e){
    var reader = new FileReader();
    reader.onload = function(e){
        imgData = e.target.result
    };
    reader.readAsDataURL(e.target.files[0])
});

confirmButton.addEventListener("click", function(){
    if ( selectedFile ) {
        var fileReader = new FileReader();
        fileReader.onload = function(e){
            var nombres = [];
            var folios = [];
            var data = e.target.result;
            var workbook = XLSX.read(data, { type: "binary" });
            //console.log(workbook.SheetNames)
            let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets["Foliado"]);
            let jsonObject = JSON.stringify(rowObject);
            console.log(rowObject.length);
            rowObject.forEach(fila => {
                nombres.push(fila["Nombre"])
                folios.push(fila["Folio"])
            })
            console.log(nombres)
            console.log(folios)

            var doc = new jsPDF('l', 'mm', "a4");
            var i = 0

            doc.setFont("helvetica");
            

            nombres.forEach(nombre => {
                doc.addImage(imgData, 'JPEG', 0, 0, 297,210);
                doc.setFontSize(30);
                doc.text(nombre, 190,105, {align:'center'});
                doc.setFontSize(15);
                doc.text(folios[i], 250,12, {align:'center'});
                i++;
                doc.addPage();
            });
    
            
            doc.save("certificados.pdf")
            /*workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                let jsonObject = JSON.stringify(rowObject);
                console.log(jsonObject);
            });*/
        };
        fileReader.readAsBinaryString(selectedFile);








    }
});

