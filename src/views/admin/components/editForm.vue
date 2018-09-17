<template>
    <div class="editForm">
        <div class="cancelEdit">
            <el-button type="success" icon="el-icon-check" @click="submitEditSysFun">保存</el-button>
            <el-button type="danger" icon="el-icon-close" @click="closeEditFun">关闭</el-button>
        </div>
        <el-tabs v-model="activeName" @tab-click="changeTabFun">
            <el-tab-pane label="添加/修改用户信息" name="first">
                <!---------------------------------------->
                <el-form :rules="editSysFormRules" ref="editSysForm" :model="editSysForm" label-position="left" label-width="120px" style='width: 800px; margin-left:50px;'>
                    <el-form-item label="用户组" prop="group_id">
                        <el-select v-model="editSysForm.group_id" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                        <el-radio v-model="editSysForm.status" label="1">正常</el-radio>
                        <el-radio v-model="editSysForm.status" label="0">锁定</el-radio>
                    </el-form-item>
                    <el-form-item label="用户名" prop="user_name">
                        <el-input v-model="editSysForm.user_name" placeholder="请输入用户名1"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="passwd">
                        <el-input v-model="editSysForm.passwd" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="真实姓名" prop="true_name">
                        <el-input v-model="editSysForm.true_name" placeholder="请输入真实姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="telephone">
                        <el-input v-model="editSysForm.telephone" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="editSysForm.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>-->
                    <el-form-item label="活动时间">
                        <el-col :span="11">
                          <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                          <el-time-picker type="fixed-time" placeholder="选择时间" style="width: 100%;"></el-time-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="活动性质">
                        <el-checkbox-group>
                            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                            <el-checkbox label="地推活动" name="type"></el-checkbox>
                            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="活动形式">
                        <el-input type="textarea"></el-input>
                    </el-form-item>
                    
                    <div class="editor-container">
                        <Tinymce :height="300" ref="editor" v-model="editSysForm.content" />
                    </div>
                </el-form>
                <div style="margin-top: 30px; margin-left: 50px;">
                    <el-button @click="closeEditFun" style="width: 180px;">取消</el-button>
                    <el-button type="primary" :loading="btnLoading" style="width: 180px;" @click="submitEditSysFun">确认</el-button>
                </div>
                <!---------------------------------------->
            </el-tab-pane>
            <!--<el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>-->
            <!--<el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>-->
        </el-tabs>
    </div>
</template>

<script>
    import { checkForm } from '@/filters/validatorForm'
    import { addAdminApi } from '@/api/admin'
    import { Message } from 'element-ui'
    
    import Tinymce from '@/components/Tinymce'
    export default {
        data() {
            return {
                activeName: 'first',
                btnLoading: false,
                isAdd: false,
                options: [
                    {label:'首页上部轮播',value: '1'},
                    {label:'首页中部视频广告',value: '2'},
                    {label:'首页左边栏广告',value: '3'},
                    {label:'首页背景',value: '4'}
                ],
                editSysForm: {
                    admin_id: '',
                    user_name: '',
                    passwd: '',
                    status: '',
                    content:'',
                    true_name: '',
                    telephone: '',
                    email: '',
                },
                editSysFormRules: {
                    //user_name: [{ required: true, trigger: 'blur', message:'不能为空'}],
                    user_name: [{ required: true, type: 'name', trigger: 'blur', validator: checkForm }],
                    passwd: [{ required: false, type: 'pwd', min:"6", max:"8", maxnum:"100", minnum:"1", trigger: 'blur', validator: checkForm }],
                },
            }
        },
        props: ['jsonId'],
        components: {
            Tinymce,
        },
        methods: {
            changeTabFun(tab, event) {
                console.log(tab, event);
            },
            closeEditFun() {
                this.$emit('closeEditForm', false)
            },
            checkFormDataFun(){//检查表单是否合法
                let ret = false;
                this.$refs.editSysForm.validate(valid => {
                    if(valid) {
                        ret = true;
                    } else {
                        Message({
                            message: '请填写好相应项，才能发公告！',
                            type: 'error',
                            duration: 2 * 1000
                        })
                        console.log('error submit!!')
                        ret = false
                    }
                    return ret;
                });
                
            },
            messageFun(type,msg){
                if(type == 1){
                    Message({
                        message: msg,
                        type: 'success',
                        duration: 3 * 1000
                    }) 
                }else{
                    Message({
                        message: msg,
                        type: 'error',
                        duration: 3 * 1000
                    })
                }
            },
            submitEditSysFun() {
                if(!this.checkFormDataFun()) return;//检查表单是否合法
               
                if(this.isAdd){
                    delete this.editSysForm.admin_id;//添加时不需要ID
                    console.log(JSON.stringify(this.editSysForm));
                    addAdminApi(this.editSysForm).then(response => {
                        console.log(JSON.stringify(response.data))
                        this.messageFun(1,'添加成功');
                        this.closeEditFun();
                        this.btnLoading = false
                    }).catch(res => {
                        console.log(JSON.stringify(res))
                        this.messageFun(2,'添加失败');
                        this.btnLoading = false;
                    });
                }else{
                    editAdminApi(this.editSysForm).then(response => {
                        console.log(JSON.stringify(response))
                        this.messageFun(1,'修改成功');
                        this.closeEditFun();
                        this.btnLoading = false
                    }).catch(res => {
                        console.log(JSON.stringify(res))
                        this.messageFun(2,'修改失败');
                        this.btnLoading = false;
                    });
                }
                        
            }
        },
        //created() {
        mounted() {
        },
        watch: {
            jsonId(val, oldVal) { //普通的watch监听
                if(val){//有值，说明是修改
                    this.isAdd = false;
                    console.log(val,'修改')
                }else{
                    this.isAdd = true;
                    console.log(val,'添加')
                }
                let data = { id: this.jsonId };
                /*
                getAdminListApi(data).then(response => {
                    console.log(JSON.stringify(response))
                    this.editSysForm = response.data
                }).catch(res => {
                    console.log(JSON.stringify(res))
                });
                */
            },
        },
    }
</script>

<style>

</style>