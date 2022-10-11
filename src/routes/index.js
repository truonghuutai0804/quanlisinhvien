const classRouter = require('./class')
const dashboardRouter = require('./dashboard')
const facultyRouter = require('./faculty')
const groupRouter = require('./group')
const levelRouter = require('./level')
const majorRouter = require('./major')
const provinceRouter = require('./province')
const scoreRouter = require('./score')
const semesterRouter = require('./semester')
const siteRouter = require('./site')
const studentRouter = require('./student')
const subjectRouter = require('./subject')
const teacherRouter = require('./teacher')
const yearRouter = require('./year')


function route(app){
    app.use(classRouter)
    app.use(dashboardRouter)
    app.use(facultyRouter)
    app.use(groupRouter)
    app.use(levelRouter)
    app.use(majorRouter)
    app.use(provinceRouter)
    app.use(scoreRouter)
    app.use(semesterRouter)
    app.use(studentRouter)
    app.use(subjectRouter)
    app.use(teacherRouter)
    app.use(yearRouter)
    app.use('/', siteRouter)
}

module.exports = route
