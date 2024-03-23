function createInput() {
    var input=document.createElement("input")
    input.type="text"
    input.placeholder="Enter a document name"
    input.id = "documentNameInput"
    document.getElementById("container").appendChild(input)
    input.focus()
    var button = document.getElementById("createDocumentBtn")
    button.style.display = "none"
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            var documentName=input.value
            if (documentName.trim()!=="") {
                save(documentName)
                input.disabled=true
                input.remove()
                button.style.display="inline"

        }}    
    })}
function save(nigga) {
    alert("Document saved as:  " + nigga);
}
