<template>
    <div class="app-container">
        <div class="filter-container li-search">
            <div class="li-search-content" :class="moreVisible?'':'li-hnone'">
                <el-input v-model="listQuery.type" placeholder="用户名称"></el-input>
                <el-input v-model="listQuery.type" placeholder="用户名称"></el-input>
                <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
                <el-time-picker type="fixed-time" placeholder="选择时间"></el-time-picker>
                <el-input v-model="listQuery.type" placeholder="用户名称"></el-input>
                <el-select v-model="listQuery.type" placeholder="请选择">
                    <el-option :key="1" :label="'选项1'" :value="1"></el-option>
                    <el-option :key="2" :label="'选项2'" :value="2"></el-option>
                    <el-option :key="3" :label="'选项3'" :value="3"></el-option>
                </el-select>
                <el-date-picker v-model="listQuery.data" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class="moresearch" @click="moreVisible = !moreVisible">
                <el-button type="primary" icon="el-icon-search" @click.stop="serchFun">搜索</el-button>
                <el-button type="warning" plain icon="el-icon-refresh" @click.stop="reSearchFun">重置</el-button>
                <el-button type="success" icon="el-icon-plus" @click.stop="editFormFun()">添加</el-button>
                <i v-if="moreVisible" class="el-icon-arrow-up showMore"> 收起</i>
                <i v-else class="el-icon-arrow-down showMore"> 展开</i>
            </div>
        </div>
        
        <div class="filter-container li-search">
            <el-input v-model="listQuery.type" placeholder="用户名称"></el-input>
            <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
            <el-time-picker type="fixed-time" placeholder="选择时间"></el-time-picker>
            <el-button type="primary" icon="el-icon-search" @click.stop="serchFun">搜索</el-button>
            <el-button type="warning" plain icon="el-icon-refresh" @click.stop="reSearchFun">重置</el-button>
            <el-button type="success" icon="el-icon-plus" @click.stop="editFormFun()">添加</el-button>
        </div>
        
        <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
            <el-table-column label="Id" width="80" prop="admin_id"></el-table-column>
            <el-table-column label="用户名" width="100" prop="user_name"></el-table-column>
            <el-table-column label="状态" prop="status"></el-table-column>
            <el-table-column label="用户组" prop="group_id"></el-table-column>
            <el-table-column label="真实姓名" width="100" prop="true_name"></el-table-column>
            <el-table-column label="手机号" prop="telephone"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="最后登录ip" prop="last_login_ip"></el-table-column>
            <el-table-column align="center" label="操作" width="160">
                <template slot-scope="scope">
                    <span @click="editFormFun(scope.row)">编辑</span> ｜
                    <span @click="delPayFun(scope.row.admin_id)">删除</span> ｜
                    <span>权限</span>
                </template>
            </el-table-column>
        </el-table>
        <!--<div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page_no" :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>-->

        <transition name="fade-transform" mode="out-in">
            <edit-form v-show="editFormVisible" :jsonId="jsonID" @closeEditForm="(statsT)=>{editFormVisible = statsT; getList();}">
            </edit-form>
        </transition>

    </div>
</template>
<script>
    import { Message } from 'element-ui'
    import { getAdminListApi, addAdminApi, delAdminApi } from '@/api/admin'
    //import { checkForm } from '@/filters/form'
    import { checkForm } from '@/filters/validatorForm'

    import editForm from './components/editForm'
    export default {
        name: 'PresentRecord',
        data() {
            return {
                editFormVisible: false,
                moreVisible: false,
                jsonID: '',
                tableKey: 0,
                list: null,
                total: null,
                listLoading: true,
                listQuery: {
                    'type': '',
                    'data': '',
                    'page_no': 1,
                    'page_size': 10,
                    'order_by': [{
                        'order_field': 'id',
                        'order_value': 'desc'
                    }],
                },
                options: [{
                        label: '首页上部轮播',
                        value: '1'
                    },
                    {
                        label: '首页中部视频广告',
                        value: '2'
                    },
                    {
                        label: '首页左边栏广告',
                        value: '3'
                    },
                    {
                        label: '首页背景',
                        value: '4'
                    }
                ],
                btnLoading: false,
                editSysFormVisible: false,
                isAdd: false,
                editSysForm: {
                    admin_id: '',
                    user_name: '',
                    passwd: '',
                    status: '',
                    true_name: '',
                    telephone: '',
                    email: '',
                },
                editSysFormRules: {
                    //user_name: [{ required: true, trigger: 'blur', message:'不能为空'}],
                    user_name: [{
                        required: true,
                        type: 'name',
                        trigger: 'blur',
                        validator: checkForm
                    }],
                    passwd: [{
                        required: false,
                        type: 'pwd',
                        trigger: 'blur',
                        validator: checkForm
                    }],
                },
            }
        },
        filters: {

        },
        created() {
            this.getList();
        },
        components: {
            editForm,
        },
        methods: {
            getList() {
                this.listLoading = true
                getAdminListApi(this.listQuery).then(response => {
                    //console.log(JSON.stringify(response))
                    this.list = response.data
                    this.total = response.record_total;
                    this.listLoading = false
                }).catch(res => {
                    console.log(JSON.stringify(res))
                    this.listLoading = false;
                });
            },
            handleSizeChange(val) {
                this.listQuery.page_size = val;
                this.getList()
            },
            handleCurrentChange(val) {
                this.listQuery.page_no = val;
                this.getList()
            },
            searchToDoFun(searchObj){//搜索组件返回操作
                this.listQuery = searchObj.listQuery;
                if(searchObj.type == 'reSearch'){
                    
                }else if(searchObj.type == 'search'){
                    
                }else if(searchObj.type == 'add'){
                    
                }
            },
            serchFun() {
                this.listQuery.page_no = 1;
                this.getList();
            },
            reSearchFun() {
                this.listQuery = {
                    'way_name': '',
                    'page_no': 1,
                    'page_size': 10,
                    'order_by': [{
                        'order_field': 'id',
                        'order_value': 'desc'
                    }],
                }
                this.getList();
            },
            editFormFun(itemS) {
                if(itemS) {
                    this.jsonID = itemS;
                } else {
                    this.jsonID == '' ? this.jsonID = 0 : this.jsonID = '';
                }
                this.editFormVisible = true;
            },
            delPayFun(nId) {
                console.log(nId);
                if(!nId) return;
                nId = parseInt(nId);
                this.$confirm('确认要删除？').then(_ => {
                    delAdminApi({
                        admin_id: nId
                    }).then(response => {
                        console.log(JSON.stringify(response));
                        Message({
                            message: '删除成功！',
                            type: 'success',
                            duration: 2 * 1000
                        })
                        this.getList();
                    }).catch(res => {
                        console.log(11111)
                        console.log(JSON.stringify(res))
                        this.listLoading = false;
                    })
                    return false;
                }).catch(res => {
                    console.log(1111111);
                });
            },
        },
    }
</script>

<style>
    .app-main {
        position: relative;
    }
</style>