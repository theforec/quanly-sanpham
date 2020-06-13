var modal, idMaSanPham, idTenSanPham, idDonGia, idGhiChu, tableContent;
var listSanPham = new Array();

initTable();

function initTable() {
    modal = document.getElementById("addModal");
    idMaSanPham = document.getElementById("maSanPham");
    idTenSanPham = document.getElementById("tenSanPham");
    idDonGia = document.getElementById("donGia");
    idGhiChu = document.getElementById("ghiChu");

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
    }

    updateTable();
}

function updateTable() {
    document.getElementById("table").innerHTML = tableContent;
}

function editLabel(string) {
    document.getElementById("labelAddItem").innerHTML = string;
}
function addItem() {
    modal.style.display = "block";
    editLabel("Thêm sản phẩm");
}

function editItem(index) {
    modal.style.display = "block";
    editLabel("Sửa sản phẩm");
    let editedItem = listSanPham[index];
    idMaSanPham.value = editedItem.maSanPham;
    idTenSanPham.value = editedItem.tenSanPham;
    idDonGia.value = editedItem.donGia;
    idGhiChu.value = editedItem.ghiChu;
}

function deleteItem(index) {
    listSanPham.splice(index, 1);
    saveStorage();
    initTable();
}

function getValue() {
    maSanPham = idMaSanPham.value;
    tenSanPham = idTenSanPham.value;
    donGia = idDonGia.value;
    ghiChu = idGhiChu.value;
}

function saveStorage() {
    localStorage.setItem("listSanPham", JSON.stringify(listSanPham));
}

function confirmItem() {
    getValue();
    let flag = 0;
    if (maSanPham == 0 || tenSanPham == 0 || donGia == 0 || ghiChu == 0) {
        alert('Nhập thông tin chưa chính xác');
        flag++;
    }

    if (flag == 0) {
        let newSanPham = {
            maSanPham: maSanPham,
            tenSanPham: tenSanPham,
            donGia: donGia,
            ghiChu: ghiChu
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

window.onclick = function (event) {
    if (event.target == this.modal) {
        this.closeModal();
    }
}