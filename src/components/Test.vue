<template>
    <div class="modal-wrapper">
      <div class="overlay"></div>
      <div class="modal">
        <table class="ta">
          <tr class="tr">
            <th>저울 코드</th>
            <th>전송 업무</th>
            <th>전송 여부</th>
            <th>최종 전송 일시</th>
          </tr>
          <tr v-for="i in scaleModal" :key="i.scaleCode" class="tr">
            <td>{{i.scaleCode}}</td>
            <td>{{i.sendTaskCode}}</td>
            <td>{{i.sendYn}}</td>
            <td>{{i.fnlSendDt}}</td>
          </tr>
        </table>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'Test',
  //외부에 있는 것을 사용하는 메서드
  computed: {
    ...mapState(['ScaleModal'])
  },
  data(){
    return {
      scaleModal : [],
      init : true,
      imgSrc : require('../assets/close.png'),
      search: ""
    }
  },
  methods: {
    scaleModalCall(){
      axios({
        url: "http://172.16.18.116:8080/scaleSendResult",
        method: "GET"
      }).then(res =>{
        console.log(res.data.data)
        //if문 사용할 때 여기서 필터(함수) 처리해야함.
        //가공해서 넣어주어야함.
        this.scaleModal = res.data.data
      }).catch(res =>{

      });
    },
    scaleModalInit(){
      //이렇게 하면 plugroup에 값이 할당이 되지 않기 때문에 list가 안나옴
      this.$store.dispatch('SCALE_MODAL_INIT')
      this.$store.dispatch('SCALE_MODAL_INIT_CALLBACK', {
        nextCallback: (res) => {
          console.log(res.data.data)
          this.scaleModal = res.data.data
        }
      })
      // this.pluList = this.pluGroup
    },
    scaleChange(){
      // location.href = '/home' -> 새로고침 형식
      this.$router.push('/Scale').catch(err => {})
    },
    SearchInput(e){
      this.search = e.target.value;
      if(this.search.length !== 0){
        clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
          const filterList = this.sendResultList.filter(items => items.scaleCode.includes(this.search));
          console.log(filterList)
          this.scaleModal = filterList;
        }, 100);
      }else {
        clearTimeout(this.debounce);
        this.debounce = setTimeout(()=> {
          this.scaleModalCall()
        });
      }
    }

  },
  created() {
     this.scaleModalCall()
    //this.pluInit()
  },
}
</script>

<style scoped>
#search{
  float: right;
  margin-top: -10px;
  margin-right: 30px;
}

.modal{
  position: absolute;
  margin: 100%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 1em;
  box-shadow: 0 0 1em #00000033;
}

.modal-wrapper{
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1200px;
  height: 100%;
}

.overlay{
  position: absolute;
}

.box-title{
  position: absolute;
  font-size: 26px;
}

.ta {
  width: 1000px;
  height: 100%;

  table-layout: fixed; 
  border: 1px solid #E1E7EE;
  border-collapse: collapse;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
}
.th{
  color: white;
  font-size: 15pt;
  font-weight: 500;
  border: 10px soild white;
  background-color: #003366;
}
.tr{
  border-radius: 10px;
  border-bottom: 1px solid #E1E7EE;
}
.tr td, .th td{
  font-size: 14pt;
  color: #374554;
  font-weight: 500;
}


table {
  margin: 0;
  table-layout: fixed;

  border-collapse: collapse;
  border-style: hidden;
  box-shadow: 0 0 0 1px #E1E7EE;
  border-radius: 10px;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
}
th{
  max-height: 47px;
  padding: 11px;
  color: white;
  font-size: 15pt;
  font-weight: 500;
  border: 10px soild white;
  background-color: #003366;
}
tr{
  border-radius: 10px;
  border-bottom: 1px solid #E1E7EE;
}
td{
  max-height: 46px;
  padding: 11px;
  font-size: 14pt;
  color: #374554;
  font-weight: 500;
}
/* 필터 */

.img{
  width: 20px;
}

button{
  background-color: transparent;
  float: right;
  width: 30px;
  height: 25px;
  margin-right: 10px;
  border: none;
  cursor: pointer;
}
</style>