var modal, idMaSanPham, idTenSanPham, idDonGia, idGhiChu, tableContent, btnConfirm, btnSave, btnClear;
var listSanPham = new Array();

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

    initTable();
}

function initTable() {
    tableContent = `<tr>
                        <caption id="caption">
                        Quản lý sản phẩm
                        </caption>
                        <th colspan="5" id="searchBar">
                        <button class="buttonAddItem" type="button" onclick="addItem()">
                            Thêm sản phẩm
                        </button>
                        <input type="text" id="search" placeholder="Tìm tên sản phẩm" />
                        <button type="button" onclick="search()">Tìm kiếm</button>
                        </th>
                    </tr>
                    <tr id="label">
                        <td>Mã sản phẩm</td>
                        <td>Tên sản phẩm</td>
                        <td>Đơn giá</td>
                        <td>Ghi chú</td>
                        <td>Action</td>
                    </tr>`

    if (localStorage.getItem("listSanPham") != null) {
        listSanPham = JSON.parse(localStorage.getItem("listSanPham"));
        listSanPham.forEach((sanpham, index) => {
            tableContent += `<tr>
            <td>${sanpham.maSanPham}</td>
            <td>${sanpham.tenSanPham}</td>
            <td>${sanpham.donGia}</td>
            <td>${sanpham.ghiChu}</td>
            <td>
                <a href='#' onclick="editItem(${index})">Sửa</a> | <a href='#' onclick="deleteItem(${index})">Xoá</a>  
            </td>
          </tr>`
        });
        updateTable();
    }
}

function updateTable() {
    document.getElementById("table").innerHTML = tableContent;
}

function editLabel(string) {
    document.getElementById("labelAddItem").innerHTML = string;
}

function addItem() {
    showModal();
    editLabel("Thêm sản phẩm");
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
    let editedItem = listSanPham[index];
    idMaSanPham.value = editedItem.maSanPham;
    idMaSanPham.readOnly = "true";
    idTenSanPham.value = editedItem.tenSanPham;
    idDonGia.value = editedItem.donGia;
    idGhiChu.value = editedItem.ghiChu;
}

function confirmItem() {
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
        listSanPham.forEach(sp => {
            if (newSanPham.maSanPham == sp.maSanPham) {
                flag2++;
                return;
            }
        });
        if (flag2 != 0) {
            alert("Không được nhập trùng mã sản phẩm");
            return;
        }

        listSanPham.push(newSanPham);
        saveStorage();

        tableContent += `<tr>
            <td>${newSanPham.maSanPham}</td>
            <td>${newSanPham.tenSanPham}</td>
            <td>${newSanPham.donGia}</td>
            <td>${newSanPham.ghiChu}</td>
            <td>
                <a href='#' onclick="editItem(${listSanPham.length - 1})">Sửa</a> | <a href='#' onclick="deleteItem(${listSanPham.length - 1})">Xoá</a>  
            </td>
          </tr>`

        updateTable();
        closeModal();
    }
}

function saveItem() {
    newItem = getValue();
    let index
    listSanPham.forEach((sp, i) => {
        if (sp.maSanPham == newItem.maSanPham) {
            index = i;
            return;
        }
    });
    listSanPham[index] = newItem;
    saveStorage();
    initTable();
    closeModal();
}

function deleteItem(index) {
    listSanPham.splice(index, 1);
    saveStorage();
    initTable();
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
    localStorage.setItem("listSanPham", JSON.stringify(listSanPham));
}

function clearItem() {
    idMaSanPham.value = "";
    idTenSanPham.value = "";
    idDonGia.value = "";
    idGhiChu.value = "";
}

function search() {
    alert(JSON.stringify(listSanPham))
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