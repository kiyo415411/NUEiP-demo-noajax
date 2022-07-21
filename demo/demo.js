$(document).ready(function () {
    var url = 'ajax/ajaxCard';
    var ajaxobj = new AjaxObject(url, 'json');
    ajaxobj.getall();

    var tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    var popoverTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="popover"]')
    );
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // 新增按鈕
    $('#addconfirm').click(function (e) {
        var url = 'ajax/ajaxCard';
        var cnname = $('#addcnname').val();
        var enname = $('#addenname').val();
        var phone = $('#addphone').val();
        var email = $('#addemail').val();
        var sex = $('input:radio:checked[name="addsex"]').val();
        var ajaxobj = new AjaxObject(url, 'json');

        ajaxobj.cnname = cnname;
        ajaxobj.enname = enname;
        ajaxobj.phone = phone;
        ajaxobj.email = email;
        ajaxobj.sex = sex;

        var forms = document.querySelectorAll('.needs-validation');

        Array.prototype.slice.call(forms).forEach(function (form) {
            form.addEventListener(
                'submit',
                function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                    } else {
                        ajaxobj.add();
                        event.preventDefault();
                        $('#exampleModal').modal('toggle');
                    }

                    form.classList.add('was-validated');
                },
                false
            );
        });
    });

    // 搜尋按鈕
    $('#searchconfirm').click(function (e) {
        var url = 'ajax/ajaxCard';
        var cnname = $('#secnname').val();
        var enname = $('#seenname').val();
        var phone = $('#sephone').val();
        var email = $('#seemail').val();
        var sex = $('input:radio:checked[name="sesex"]').val();
        var ajaxobj = new AjaxObject(url, 'json');

        ajaxobj.cnname = cnname;
        ajaxobj.enname = enname;
        ajaxobj.phone = phone;
        ajaxobj.email = email;
        ajaxobj.sex = sex;
        ajaxobj.search();

        e.preventDefault();
    });
});

// 修改鈕
$('#cardtable').on('click', '.modifybutton', function () {
    var url = 'ajax/ajaxCard';
    var ajaxobj = new AjaxObject(url, 'json');
    ajaxobj.modify_get();
});
$('#cardtable').on('click', '.deleteconfirm', function () {
    var deleteid = $(this).attr('id').substring(12);
    var url = 'ajax/ajaxCard';
    var ajaxobj = new AjaxObject(url, 'json');
    ajaxobj.id = deleteid;
    ajaxobj.delete();
});

function refreshTable(data) {
    // var HTML = '';
    $('#cardtable tbody > tr').remove();
    $.each(data, function (key, item) {
        var strsex = '';
        if (item.sex == 0) strsex = '男';
        else strsex = '女';
        var row = $('<tr></tr>');
        var nameTip =
            '[&nbsp;' +
            strsex +
            '&nbsp;]&nbsp;' +
            item.cnname +
            '&nbsp;(&nbsp;' +
            item.enname +
            '&nbsp;)';
        var phonePopover = item.phone.replace(/^(.{4})(.*)(.{3})/, '$1-$2-$3');
        row.append(
            $('<td></td>').html(
                `<span data-bs-toggle="tooltip" data-bs-placement="right" title=${nameTip}>${item.cnname}</span>`
            )
        );
        row.append($('<td></td>').html(item.enname));
        row.append(
            $('<td></td>').html(
                `<span tabindex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="right" data-bs-content=${phonePopover}>${item.phone}</span>`
            )
        );
        row.append($('<td></td>').html(item.email));
        row.append($('<td></td>').html(strsex));
        row.append(
            $('<td></td>').html(
                `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square modifybutton" viewBox="0 0 16 16" id="modifybutton" type="button" data-bs-toggle="modal" data-bs-target="#modifyModal">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
            <div class="modal fade" id="modifyModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">修改表單</h5>
                            <button 
                            type="button" 
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"/>
                        </div>
                        <form 
                            method="post" 
                            id="modifyform"
                            class="text-start p-3 needs-validation-modify"
                            novalidate
                            >
                        <div class="modal-body d-grid gap-3">
                        <!-- 中文姓名 -->
                        <div class="formcnname">
                            <div class="form-group">
                                <label for="element-1">中文姓名</label>
                                <input
                                    name="cnname"
                                    type="text"
                                    id="mocnname"
                                    class="form-control"
                                    required
                                />
                                <div class="invalid-feedback">
                                    請輸入中文姓名
                                </div>
                            </div>
                        </div>
                        <!-- 英文姓名 -->
                        <div class="formenname">
                            <div class="form-group">
                                <label for="element-1">英文姓名</label>
                                <input
                                    name="enname"
                                    type="text"
                                    id="moenname"
                                    class="form-control"
                                    required
                                />
                                <div class="invalid-feedback">
                                    請輸入英文姓名
                                </div>
                            </div>
                        </div>
                        <!-- 手機號碼 -->
                                <div class="formenname">
                                    <div class="form-group">
                                        <label for="element-1">手機號碼</label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            pattern="^(09)[0-9]{8}$"
                                            id="mophone"
                                            class="form-control"
                                            required
                                        />
                                        <div class="invalid-feedback">
                                            請輸入有效的電話號碼格式
                                        </div>
                                    </div>
                                </div>
                                <!-- 電子郵件 -->
                                <div class="formenname">
                                    <div class="form-group">
                                        <label for="element-1">電子郵件</label>
                                        <input
                                            name="email"
                                            type="email"
                                            id="moemail"
                                            class="form-control"
                                            required
                                        />
                                        <div class="invalid-feedback">
                                            請輸入有效的電子郵件格式
                                        </div>
                                    </div>
                                </div>
                        <!-- 性別 -->
                        <div class="formsex">
                            <label for="element-1">性別</label>
                            <div class="sex-group d-flex gap-5">
                                <label
                                    ><input
                                        type="radio"
                                        name="mosex"
                                        value="man"
                                        class="radio"
                                        id="modifyman"
                                    />男</label
                                >
                                <label
                                    ><input
                                        type="radio"
                                        name="mosex"
                                        value="woman"
                                        class="radio"
                                        id="modifywoman"
                                    />女</label
                                >
                            </div>
                        </div>
                        <div class="formsid" style="display: none">
                            <input name="sid" id="modifysid" />
                        </div>  
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                            <button  type="reset" class="btn btn-secondary">重新填寫</button>
                            <button id="modifyconfirm" type="submit"
                            class="modifyconfirm btn btn-primary">確定修改</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        `
            )
        );
        row.append(
            $('<td></td>').html(
                `
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                fill="currentColor" 
                class="bi bi-trash-fill" 
                viewBox="0 0 16 16"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
                
                <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">刪除確認</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                            </div>
                            <div class="modal-body text-start px-4">
                                <p>確定刪除這筆資料嗎：</p>
                                <div class="table px-4">
                                    <div class="row">
                                        <div class="col">
                                        中文名字
                                        </div>
                                        <div class="col">
                                        ${item.cnname}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                        英文名字
                                        </div>
                                        <div class="col">
                                        ${item.enname}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                        手機號碼
                                        </div>
                                        <div class="col">
                                        ${item.phone}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                        電子信箱
                                        </div>
                                        <div class="col">
                                        ${item.email}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                        性別
                                        </div>
                                        <div class="col">
                                        ${strsex}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                                <button id="deleteconfirm" type="button" class="deleteconfirm btn btn-primary" data-bs-dismiss="modal">確認刪除</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
            )
        );
        $('#cardtable').append(row);
    });
}

function initEdit(response) {
    var modifyid = $('#cardtable').attr('id').substring(12);

    $('#mocnname').val(response[0].cnname);
    $('#moenname').val(response[0].enname);
    $('#mophone').val(response[0].phone);
    $('#moemail').val(response[0].email);
    if (response[0].sex == 0) {
        $('#modifyman').prop('checked', true);
        $('#modifywoman').prop('checked', false);
    } else {
        $('#modifyman').prop('checked', false);
        $('#modifywoman').prop('checked', true);
    }
    $('#modifysid').val(modifyid);

    $('#modifyconfirm').click(function (e) {
        var url = 'ajax/ajaxCard';
        var cnname = $('#mocnname').val();
        var enname = $('#moenname').val();
        var phone = $('#mophone').val();
        var email = $('#moemail').val();
        var sex = $('input:radio:checked[name="mosex"]').val();
        var ajaxobj = new AjaxObject(url, 'json');

        ajaxobj.cnname = cnname;
        ajaxobj.enname = enname;
        ajaxobj.phone = phone;
        ajaxobj.email = email;
        ajaxobj.sex = sex;
        ajaxobj.id = modifyid;

        var formsmodify = document.querySelectorAll('.needs-validation-modify');

        Array.prototype.slice.call(formsmodify).forEach(function (form) {
            form.addEventListener(
                'submit',
                function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                    } else {
                        ajaxobj.modify();
                        event.preventDefault();
                        $('#modifyModal').modal('toggle');
                    }

                    form.classList.add('was-validated');
                },
                false
            );
        });
    });
}

/**
 *
 * @param string
 *          url 呼叫controller的url
 * @param string
 *          datatype 資料傳回格式
 * @uses refreshTable 利用ajax傳回資料更新Table
 */
function AjaxObject(url, datatype) {
    this.url = url;
    this.datatype = datatype;
}
AjaxObject.prototype.cnname = '';
AjaxObject.prototype.enname = '';
AjaxObject.prototype.phone = '';
AjaxObject.prototype.email = '';
AjaxObject.prototype.sex = '';
AjaxObject.prototype.id = 0;
AjaxObject.prototype.alertt = function () {
    alert('Alert:');
};
AjaxObject.prototype.getall = function () {
    response =
        '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","phone":"0912345678","email":"peter35@gmail.com","sex":"0"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","phone":"0912345678","email":"peter35@gmail.com","sex":"0"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","phone":"0912345678","email":"peter35@gmail.com","sex":"0"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","phone":"0912345678","email":"peter35@gmail.com","sex":"1"}]';
    refreshTable(JSON.parse(response));
};
AjaxObject.prototype.add = function () {
    response =
        '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","phone":"0912345678","email":"peter35@gmail.com","sex":"0"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","phone":"0912345678","email":"peter35@gmail.com","sex":"0"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","phone":"0912345678","email":"peter35@gmail.com","sex":"0"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","phone":"0912345678","email":"peter35@gmail.com","sex":"1"},{"s_sn":"52","cnname":"新增帳號","phone":"0912345678","email":"peter35@gmail.com","enname":"NewAccount","sex":"1"}]';
    refreshTable(JSON.parse(response));
};
AjaxObject.prototype.modify = function () {
    response =
        '[{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","phone":"0912345678","email":"peter35@gmail.com","sex":"0"}]';
    refreshTable(JSON.parse(response));
};
AjaxObject.prototype.modify_get = function () {
    response =
        '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","phone":"0912345678","email":"peter35@gmail.com","sex":"0"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","phone":"0912345678","email":"peter35@gmail.com","sex":"0"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","phone":"0912345678","email":"peter35@gmail.com","sex":"0"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","phone":"0912345678","email":"peter35@gmail.com","sex":"1"}]';
    initEdit(JSON.parse(response));
};
AjaxObject.prototype.search = function () {
    response =
        '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","phone":"0912345678","email":"peter35@gmail.com","sex":"0"}]';
    refreshTable(JSON.parse(response));
};
AjaxObject.prototype.delete = function () {
    response =
        '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","phone":"0912345678","email":"peter35@gmail.com","sex":"0"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","phone":"0912345678","email":"peter35@gmail.com","sex":"0"}]';
    refreshTable(JSON.parse(response));
};
