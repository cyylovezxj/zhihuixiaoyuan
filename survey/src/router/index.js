import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import BaseData from '@/components/baseData'
import ClazzManage from '@/components/baseData/clazzManage'
import GradeManage from '@/components/baseData/gradeManage'
import CourseManage from '@/components/baseData/courseManage'
import SchoolInfo from '@/components/baseData/schoolInfo'
import TeacherManage from '@/components/baseData/teacherManage'
import QuestionManage from '@/components/questionManage'
import QuesManage from '@/components/questionManage/quesManage'
import NaireManage from '@/components/questionManage/naireManage'
import SurveyManage from '@/components/surveyManage'
import SManage from '@/components/surveyManage/sManage'
import SMonitor from '@/components/surveyManage/sMonitor'
import SCheck from '@/components/surveyManage/sCheck'
import SurveyStatis from '@/components/surveyStatis'
import AllSurvey from '@/components/surveyStatis/allSurvey'
import ClazzSurvey from '@/components/surveyStatis/clazzSurvey'

import SystemManage from '@/components/systemManage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[{
      	path:'/baseData',
      	name: 'BaseData',
      	component:BaseData,
        children:[{
          path:'schoolInfo',
          name: 'SchoolInfo',
          component:SchoolInfo,
        },{
          path:'gradeManage',
          name: 'GradeManage',
          component:GradeManage,
        },{
          path:'clazzManage',
          name: 'ClazzManage',
          component:ClazzManage,
        },{
          path:'courseManage',
          name: 'CourseManage',
          component:CourseManage,
        },{
          path:'teacherManage',
          name: 'TeacherManage',
          component:TeacherManage,
        }]
      },{
      	path:'/questionManage',
      	name: 'QuestionManage',
      	component:QuestionManage,
        children:[{
          path:'quesManage',
          name: 'QuesManage',
          component:QuesManage,
        },{
          path:'naireManage',
          name: 'NaireManage',
          component:NaireManage,
        }]
      },{
      	path:'/surveyManage',
      	name: 'SurveyManage',
      	component:SurveyManage,
        children:[{
          path:'sManage',
          name: 'SManage',
          component:SManage,
        },{
          path:'SMonitor',
          name: 'SMonitor',
          component:SMonitor,
        },{
          path:'SCheck',
          name: 'SCheck',
          component:SCheck,
        }]
      },{
      	path:'/surveyStatis',
      	name: 'SurveyStatis',
      	component:SurveyStatis,
        children:[{
          path:'allSurvey',
          name: 'AllSurvey',
          component:AllSurvey,
        },{
          path:'clazzSurvey',
          name: 'ClazzSurvey',
          component:ClazzSurvey,
        }]
      },{
        path:'/systemManage',
        name: 'SystemManage',
        component:SystemManage
      }]
    }
  ]
})
