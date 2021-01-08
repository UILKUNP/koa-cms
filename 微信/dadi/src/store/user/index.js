export default {
	namespaced:true,
	state: {
		avatar:'',
		id:null,
		mobile:'',
		nickName:'',
		token:'',
		isWx:false,
		loginTime:''
	},
	getter: {},
	//修改state
	mutations: {
		setUser(state,data){
			const {avatar,id,mobile,nickName,token}=data
			state['avatar']=avatar
			state['loginTime']=(new Date()).format('yyyy年MM月dd日 hh:mm:ss')
			state['id']=id
			state['mobile']=mobile
			state['nickName']=nickName
			state['token']=token
		},
		//这个是单独获取用户信息接口的mutations /api.userInfo
		setUserInfo(state,data){
			const {avatar,id,mobile,nickName,isWx}=data
			state['avatar']=avatar
			state['id']=id
			state['mobile']=mobile
			state['nickName']=nickName
			state['isWx']=isWx
		},
	},
	actions: {},
}
