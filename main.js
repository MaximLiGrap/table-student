document.addEventListener('DOMContentLoaded',function (){

    const filter = createFormFilter ();
    document.body.classList.add('container')

    const table = document.createElement('table');
    table.classList.add('table')
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const trHead = document.createElement('tr');

    const thHeadName = document.createElement('th');
    const thHeadAge = document.createElement('th');
    const thHeadYearsOfEducation = document.createElement('th');
    const thHeadFaculty =document.createElement('th');

    const nameBtn = document.createElement('button');
    nameBtn.textContent = 'ФИО'
    nameBtn.classList.add('btn')
    const ageBtn = document.createElement('button');
    ageBtn.classList.add('btn')
    ageBtn.textContent = 'Дата рождения(возраст)';
    const yearsOfEducationBtn = document.createElement('button');
    yearsOfEducationBtn.classList.add('btn')
    yearsOfEducationBtn.textContent = 'Годы обучения и номер курса'
    const facultyBtn = document.createElement('button');
    facultyBtn.classList.add('btn')
    facultyBtn.textContent = 'Факультет';

    const btnAllStudents = document.createElement('button');
    btnAllStudents.classList.add('btn', 'blue')
    btnAllStudents.textContent = 'Показать всех студентов';

    thHeadName.append(nameBtn);
    thHeadAge.append(ageBtn);
    thHeadYearsOfEducation.append(yearsOfEducationBtn);
    thHeadFaculty.append(facultyBtn);

    trHead.append(thHeadName);
    trHead.append(thHeadFaculty);
    trHead.append(thHeadAge);
    trHead.append(thHeadYearsOfEducation);
    trHead.append(btnAllStudents);
    

    thead.append(trHead);

    table.append(thead);
    table.append(tbody);
    document.body.append(table);

    let students = JSON.parse(localStorage.getItem('students')) ||  [];
    render (students)


    btnAllStudents.addEventListener('click', function(){
        render (students)
    })



    //Фотма фильтра списка студентов
    function createFormFilter () {
        const formFilter = document.createElement('form');
        formFilter.classList.add('form')
        const inputNameFilter = document.createElement('input');
        inputNameFilter.classList.add('input')
        inputNameFilter.placeholder = 'ФИО';

        const inputDateOfEndEducationFilter = document.createElement('input');
        inputDateOfEndEducationFilter.placeholder = 'Год окончания обучения';
        inputDateOfEndEducationFilter.classList.add('input')
        inputDateOfEndEducationFilter.setAttribute('type', 'text');
        inputDateOfEndEducationFilter.setAttribute('minlength', '4')
        inputDateOfEndEducationFilter.setAttribute('maxlength', '4')
        

        const inputFacultyFilter = document.createElement('input');
        inputFacultyFilter.placeholder = 'Факультет';
        inputFacultyFilter.classList.add('input')

        const inputYearsOfEducationFilter = document.createElement('input');
        inputYearsOfEducationFilter.placeholder = 'Год начала обучения';
        inputYearsOfEducationFilter.classList.add('input')
        inputYearsOfEducationFilter.setAttribute('type', 'text');
        inputYearsOfEducationFilter.setAttribute('minlength', '4')
        inputYearsOfEducationFilter.setAttribute('maxlength', '4')

        const btnFilter = document.createElement('button');
        btnFilter.classList.add('btn')
        btnFilter.textContent = 'Фильтр';
        btnFilter.setAttribute('disabled', 'true');


        formFilter.append(inputNameFilter);
        formFilter.append(inputFacultyFilter);
        formFilter.append(inputYearsOfEducationFilter);
        formFilter.append(inputDateOfEndEducationFilter);
        formFilter.append(btnFilter);
        document.body.append(formFilter);
        return {
            formFilter, 
            inputYearsOfEducationFilter,
            inputNameFilter,
            inputFacultyFilter,
            inputDateOfEndEducationFilter,
            btnFilter,
        }
    }

    //Фильтр студентов 
        filter.formFilter.addEventListener('keypress', function () {
            filter.btnFilter.removeAttribute('disabled', 'true');
        })

        function filterForm(key, array, keyArray, metodNomber) {
            let search = filter[key].value;
            if (!!search){
                array = students.filter(array => array[keyArray].includes(search, metodNomber))
                if(array.length > 0) {
                    render (array);
                    filter[key].value = '';
                    }  else {       
                        console.log('student ne nayden')
                    }
            }
            
        }

    
        filter.formFilter.addEventListener('submit', function(e){
            e.preventDefault();
            let student;
            filterForm('inputNameFilter',student, 'fullName');
            filterForm('inputFacultyFilter',student, 'faculty');
            filterForm('inputYearsOfEducationFilter',student, 'startEdacation');
            filterForm('inputDateOfEndEducationFilter',student, 'startEdacation', 7);         
        })
    


    // Создание формы добления нового студента
    function createForm () {
        const btnCreateNewStudent = document.createElement('button');
        btnCreateNewStudent.classList.add('btn')
        btnCreateNewStudent.textContent = 'Добавить студента';

        const form = document.createElement('form');
        form.classList.add('form')
        const inputName = document.createElement('input');
        inputName.classList.add('input')
        inputName.placeholder = 'ФИО'
        inputName.setAttribute('required','');

        const inputAge = document.createElement('input');
        inputAge.classList.add('input')
        inputAge.placeholder = 'Дата рождения';
        inputAge.setAttribute('type', 'date');
        inputAge.setAttribute('required','');

        const inputYearsOfEducation = document.createElement('input');
        inputYearsOfEducation.classList.add('input')
        inputYearsOfEducation.placeholder = 'Дата начала обучения';
        inputYearsOfEducation.setAttribute('type', 'date');
        inputYearsOfEducation.setAttribute('required','');

        const inputFaculty = document.createElement('input');
        inputFaculty.classList.add('input')
        inputFaculty.placeholder = 'Факультет';
        inputFaculty.setAttribute('required','');

        form.append(inputName);
        form.append(inputAge);
        form.append(inputYearsOfEducation);
        form.append(inputFaculty);
        form.append(btnCreateNewStudent);

        document.body.append(form);
        return {
            form,
            inputName,
            inputAge,
            inputYearsOfEducation,
            inputFaculty,
            btnCreateNewStudent,
        }
    }

    // Очистка таблицы
    function cleanTable () {
        while(tbody.firstChild){
            tbody.removeChild(tbody.firstChild)
         }
    }

    // Render 
    function render(array) {
        cleanTable()
        createTable (array)
    }


 
    
    //Создание таблицы из существуещего массива студентов

    function createTable (array) {
        for (let obj of array) {
            let newStudent = document.createElement('tr');
            let fullName = document.createElement('td')
            let age = document.createElement('td');
            let startEdacation = document.createElement('td');
            let faculty = document.createElement('td');
            let deletStudentBtn = document.createElement('td')
            deletStudentBtn.classList.add('close')

            let now = new Date();

            let dateBird = new Date(obj.age);
            if(dateBird > now || dateBird < new Date('1900-01-01T14:48:00')) {
                return
            } else { 
                if (now.getMonth() - dateBird.getMonth() >= 0 && now.getDate() - dateBird.getDate() >= 0){
                    if ((now.getFullYear() - dateBird.getFullYear())%10 === 0){
                        age.textContent = `${obj.age} (${now.getFullYear() - dateBird.getFullYear()} лет)`;
                    } else {
                        age.textContent = `${obj.age} (${now.getFullYear() - dateBird.getFullYear()} год)`;
                    }
                } else {
                    if ((now.getFullYear() - dateBird.getFullYear() - 1)%10 === 0){
                        age.textContent = `${obj.age} (${now.getFullYear() - dateBird.getFullYear() - 1} лет)`;
                    } else {
                        age.textContent = `${obj.age} (${now.getFullYear() - dateBird.getFullYear() - 1} год)`;
                    }

                }
            }
            
            let years = new Date(obj.startEdacation);
            if(years.getFullYear() > now.getFullYear() || years.getFullYear() < 2000) {
                console.log('некоректная дата');
                return
            }   else {
                if((now.getFullYear() - years.getFullYear()) > 4 && (now.getMonth() <= 9)){
                    startEdacation.textContent = `${years.getFullYear()} - ${years.getFullYear() + 4} (Закончил)`;
                } else {
                startEdacation.textContent = `${years.getFullYear()} - ${years.getFullYear() + 4} (${now.getFullYear() - years.getFullYear()} курс)`;
                }
            }

            fullName.textContent = obj.fullName;
            faculty.textContent = obj.faculty;
            startEdacation.textContent = obj.startEdacation;


            newStudent.append(fullName);
            newStudent.append(faculty);
            newStudent.append(age);
            newStudent.append(startEdacation);
            newStudent.append(deletStudentBtn);
            tbody.append(newStudent);

            // Удалить студента из списка
            const deleteBtn = document.createElement('button');
            const removeDeleteBtn = document.createElement('button')
            const question = document.createElement('td');
            question.textContent = 'Удалить студента?'
            removeDeleteBtn.textContent = 'Нет'
            deleteBtn.textContent = 'Да'

            deletStudentBtn.addEventListener('click', function (){
                question.append(removeDeleteBtn);
                newStudent.append(question);  
                question.append(deleteBtn);  
                //let i = students.findIndex(item => item.fullName === newStudent.firstChild.textContent);

                // deletStudentBtn.setAttribute('data-index', `${i}`)    
            })
            removeDeleteBtn.addEventListener('click', function(){
                newStudent.removeChild(newStudent.lastChild);
            }) 
            
            deleteBtn.addEventListener('click', function(){
                deleteBtn.parentNode.parentNode.parentNode.removeChild(deleteBtn.parentNode.parentNode);
                students.splice(obj, 1);
                // students = students.filter(item => item.fullName != newStudent.firstChild.textContent && item.age != newStudent.childNodes.textContent);
                console.log(students);
                localStorage.setItem('students', JSON.stringify(students));  
            });
            
        }

        localStorage.setItem('students', JSON.stringify(students));  
        console.log(localStorage.students);


    }

    const formAddStudent = createForm ();

    //Действие после отправки формы

    formAddStudent.form.addEventListener('submit', function(e) {
        e.preventDefault();
        addNewStudent ()
        
    })
    


       // Состировка таблицы

    function sotrTable (mass, key){
        cleanTable ();
        mass.sort((prev, next) => {
            if(prev[key] < next[key]) return -1;
            if(prev[key] < next[key]) return 1;
        });
        createTable (mass)
        console.log(mass);
        return mass
        
    }

    nameBtn.addEventListener('click', function (){
        sotrTable (students, 'fullName')
    })

    facultyBtn.addEventListener('click', function (){
        sotrTable (students, 'faculty') 
    })

    ageBtn.addEventListener('click', function (){
        sotrTable (students, 'age')
    })

    yearsOfEducationBtn.addEventListener('click', function (){
        sotrTable (students, 'startEdacation')
    })

    // Добавить студента
    function addNewStudent () {
        let newStudent = document.createElement('tr');
        let fullName = document.createElement('td')
        let age = document.createElement('td');
        let startEdacation = document.createElement('td');
        let faculty = document.createElement('td');
        let deletStudentBtn = document.createElement('td')
        deletStudentBtn.classList.add('close')
        let student = {};
        let now = new Date();
        

        fullName.textContent = formAddStudent.inputName.value.trim();
        let dateBird = new Date(formAddStudent.inputAge.value);
        if(dateBird > now || dateBird < new Date('1900-01-01T14:48:00')) {
            console.log('некоректная дата');
            return
        } else { 
            if (now.getMonth() - dateBird.getMonth() >= 0 && now.getDate() - dateBird.getDate() >= 0){
                if ((now.getFullYear() - dateBird.getFullYear())%10 === 0){
                    age.textContent = `${formAddStudent.inputAge.value} (${now.getFullYear() - dateBird.getFullYear()} лет)`;
                } else {
                    age.textContent = `${formAddStudent.inputAge.value} (${now.getFullYear() - dateBird.getFullYear()} год)`;
                }
            } else {
                if ((now.getFullYear() - dateBird.getFullYear() - 1)%10 === 0){
                    age.textContent = `${formAddStudent.inputAge.value} (${now.getFullYear() - dateBird.getFullYear() - 1} лет)`;
                } else {
                    age.textContent = `${formAddStudent.inputAge.value} (${now.getFullYear() - dateBird.getFullYear() - 1} год)`;
                }

            }
        }
        
        let years = new Date(formAddStudent.inputYearsOfEducation.value);
        if(years.getFullYear() > now.getFullYear() || years.getFullYear() < 2000) {
            console.log('некоректная дата'); 
            return
        }   else {
            if((now.getFullYear() - years.getFullYear()) > 4 && (now.getMonth() <= 9)){
                startEdacation.textContent = `${years.getFullYear()} - ${years.getFullYear() + 4} (Закончил)`;
            } else {
            startEdacation.textContent = `${years.getFullYear()} - ${years.getFullYear() + 4} (${now.getFullYear() - years.getFullYear()} курс)`;
            }
        }
        faculty.textContent = formAddStudent.inputFaculty.value.trim();

        newStudent.append(fullName);
        newStudent.append(faculty);
        newStudent.append(age);
        newStudent.append(startEdacation);
        newStudent.append(deletStudentBtn);
        tbody.append(newStudent);

        student.fullName = fullName.textContent;
        student.age = formAddStudent.inputAge.value;
        student.startEdacation = startEdacation.textContent;
        student.faculty = faculty.textContent;
        students.push(student);
        
        localStorage.setItem('students', JSON.stringify(students));  
        console.log(localStorage.students);
        

        
        formAddStudent.inputAge.value = '';
        formAddStudent.inputName.value = '';
        formAddStudent.inputYearsOfEducation.value = '';
        formAddStudent.inputFaculty.value = '';

        // Удалить студента из списка
        const deleteBtn = document.createElement('button');
        const removeDeleteBtn = document.createElement('button')
        const question = document.createElement('td');
        question.textContent = 'Удалить студента?'
        removeDeleteBtn.textContent = 'Нет'
        deleteBtn.textContent = 'Да'

        deletStudentBtn.addEventListener('click', function (){
            question.append(removeDeleteBtn);
            newStudent.append(question);  
            question.append(deleteBtn); 
            let i = students.findIndex(item => item.fullName === newStudent.firstChild.textContent);
            deletStudentBtn.setAttribute('data-index', `${i}`)  
        })
        removeDeleteBtn.addEventListener('click', function(){
            newStudent.removeChild(newStudent.lastChild);
        }) 
        
        deleteBtn.addEventListener("click", function(){
            deleteBtn.parentNode.parentNode.parentNode.removeChild(deleteBtn.parentNode.parentNode);
            students.splice(deletStudentBtn.dataset.index, 1);
            // students = students.filter(item => item.fullName != newStudent.firstChild.textContent && item.age != newStudent.childNodes.textContent);
            console.log(students);
            localStorage.setItem('students', JSON.stringify(students));  
        });

        console.log(students);
    }


})
