const elm = {
  // content: document.getElementById("content"),
  // contentValue: document.getElementById("contentValue"),
  delete: document.getElementById("delete"),
  update: document.getElementById("update"),
};

// elm.content.innerText = elm.contentValue.value;

elm.delete.addEventListener("click", () => {
  const yakin = confirm("Yakin ingin menghapus?");
  if (!yakin) window.location.href = "/";
  else window.location.href = `/delete/${elm.delete.value}`;
});

elm.update.addEventListener("click", () => {
  window.location.href = `/update/${elm.update.value}`;
});
