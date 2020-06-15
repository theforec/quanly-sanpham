var modal, idMaSanPham, idTenSanPham, idDonGia, idGhiChu, btnConfirm, btnSave, btnClear;
var table, tableHeader, tableContent = "";
var listItems = new Array();
var status = "new";
init();

function init() {
    modal = document.getElementById("addModal");
    idMaSanPham = document.getElementById("maSanPham");
    idTenSanPham = document.getElementById("tenSanPham");
    idDonGia = document.getElementById("donGia");
    idGhiChu = document.getElementById("ghiChu");
    btnConfirm = document.getElementById("confirm");
    btnSave = document.getElementById("save");
    btnClear = document.getElementById("clear");
    if (localStorage.getItem("listItems") != null) {
        listItems = JSON.parse(localStorage.getItem("listItems"));
    }
    initTable();
    updateTableDisplay();
}

function addHtml(item, index) {
    let content = `<tr>
            <td>${item.maSanPham}</td>
            <td>${item.tenSanPham}</td>
            <td>${item.ghiChu}</td>
            <td class="donGia">${item.donGia}</td>
            <td class="action">
                <a href='#' onclick="editItem(${index})">Sửa</a> | <a href='#' onclick="deleteItem(${index})">Xoá</a>  
            </td>
          </tr>`
    return content;
}
function addStringTable(string) {
    table += string;
}
function initTableHeader() {
    table = `<tr id="label">
                <td>Mã sản phẩm</td>
                <td>Tên sản phẩm</td>
                <td>Ghi chú</td>
                <td>Đơn giá</td>
                <td>Action</td>
            </tr>`
}

function initTableContent(tableArray) {
    if (tableArray.length == 0) {
        tableContent += `<tr><p>Không có sản phẩm</p></tr>`
    }
    else {
        for (let i = 0; i < tableArray.length; i++) {
            tableContent += addHtml(tableArray[i], i);
        }
    }
}

function initTable() {
    initTableHeader();
    initTableContent(listItems);
    addStringTable(tableContent);
}

function updateTableDisplay() {
    document.getElementById("table").innerHTML = table;
}

function editLabel(string) {
    document.getElementById("labelAddItem").innerHTML = string;
}

function addItem() {
    showModal();
    editLabel("Thêm sản phẩm");
    idMaSanPham.readOnly = false;
    btnSave.style.display = "none";
    btnClear.style.display = "block";
    btnConfirm.style.display = "block";
}

function editItem(index) {
    showModal();
    btnSave.style.display = "block";
    btnClear.style.display = "none";
    btnConfirm.style.display = "none";
    editLabel("Sửa sản phẩm");
    let editedItem = listItems[index];
    idMaSanPham.value = editedItem.maSanPham;
    idMaSanPham.readOnly = true;
    idTenSanPham.value = editedItem.tenSanPham;
    idDonGia.value = editedItem.donGia;
    idGhiChu.value = editedItem.ghiChu;
}

function confirmAdd() {
    let sanpham = getValue();
    let flag = 0;
    if (sanpham.maSanPham == 0 || sanpham.tenSanPham == 0 || sanpham.donGia == 0 || sanpham.ghiChu == 0) {
        alert('Nhập thông tin chưa chính xác');
        flag++;
    }

    if (flag == 0) { //info correct
        let newSanPham = {
            maSanPham: sanpham.maSanPham,
            tenSanPham: sanpham.tenSanPham,
            donGia: sanpham.donGia,
            ghiChu: sanpham.ghiChu
        }
        let flag2 = 0;
        listItems.forEach(sp => {
            if (newSanPham.maSanPham == sp.maSanPham) {
                flag2++;
                return;
            }
        });
        if (flag2 != 0) {
            alert("Không được nhập trùng mã sản phẩm");
            return;
        }

        listItems.push(newSanPham);
        saveStorage();

        let newItemHtml = `<tr>
            <td>${newSanPham.maSanPham}</td>
            <td>${newSanPham.tenSanPham}</td>
            <td>${newSanPham.donGia}</td>
            <td>${newSanPham.ghiChu}</td>
            <td>
                <a href='#' onclick="editItem(${listItems.length - 1})">Sửa</a> | <a href='#' onclick="deleteItem(${listItems.length - 1})">Xoá</a>  
            </td>
          </tr>`
        tableContent += newItemHtml;
        table += newItemHtml;
        updateTableDisplay();
        closeModal();
    }
}

function updateDataTable(newArrayList) {
    table = table.replace(tableContent, "");
    tableContent = "";
    initTableContent(newArrayList);
    addStringTable(tableContent);
    updateTableDisplay();
}

function saveEdit() {
    newItem = getValue();
    let index;
    listItems.forEach((sp, i) => {
        if (sp.maSanPham == newItem.maSanPham) {
            index = i;
            return;
        }
    });
    listItems[index] = newItem;
    saveStorage();
    updateDataTable(listItems);
    closeModal();
}

function deleteItem(index) {
    listItems.splice(index, 1);
    saveStorage();
    updateDataTable(listItems);
}

function searchItems() {
    let txtSearch = document.getElementById("searchName");
    var listItemsFiltered = new Array();
    let name = txtSearch.value;
    if (name.length == 0) {
        updateDataTable(listItems);
        return;
    }
    listItems.forEach((sp, index) => {
        if (sp.tenSanPham.toLowerCase().search(name) != -1) {
            listItemsFiltered.push(listItems[index]);
        }
    });
    txtSearch.value = name;

    updateDataTable(listItemsFiltered);
    // document.getElementById("searchName").value = name;
    console.log(txtSearch.value);
}

function getValue() {
    let item = {
        maSanPham: idMaSanPham.value,
        tenSanPham: idTenSanPham.value,
        donGia: idDonGia.value,
        ghiChu: idGhiChu.value,
    }

    return item;
}

function saveStorage() {
    localStorage.setItem("listItems", JSON.stringify(listItems));
}

function clearItem() {
    idMaSanPham.value = "";
    idTenSanPham.value = "";
    idDonGia.value = "";
    idGhiChu.value = "";
}

function closeModal() {
    modal.style.display = "none";
    clearItem();
}
function showModal() {
    modal.style.display = "block";
}

window.onclick = function (event) {
    if (event.target == this.modal) {
        this.closeModal();
    }
}