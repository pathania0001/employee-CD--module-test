
const form = document.querySelector("form")
const inputs = document.querySelectorAll("input");
const result = document.getElementById("result");
const message = document.getElementById("msg");
let employees = [];
const removeEmp = (id)=>{
    employees = employees.filter((emp) => emp.id !== id)
    buildList();
}
let uniqueId = 0;
const buildList = ()=>{
    result.innerHTML="";
    if(employees.length>0){
    employees.forEach((employee,index)=>{
        let emp = document.createElement("div");
        emp.classList.add("emp");
        empList = document.createElement("div");
        empList.classList.add("empList");
        empList.innerHTML =  ` 
            <span>${index+1}.</span>
            <span>Name:${employee.name}</span>
            <span>Profession:${employee.profession}</span>
            <span>Age:${employee.age}</span>
        `;
        deletebtn = document.createElement("button");
        deletebtn.classList.add("delete")
        deletebtn.innerHTML = "Delete User";
        deletebtn.onclick = ()=>{removeEmp(employee.id);}
        emp.appendChild(empList);
        emp.appendChild(deletebtn);
        result.appendChild(emp)
    })
}
else{
    result.innerHTML="You have 0 Employees.";
    result.style.opacity='0.5';
    message.innerHTML = "";
    message.classList ="";
}
}

inputs.forEach((input)=>{
    input.onchange = ()=>{
      const value = input.value
      const updatedVal  = [];
      value.trim().split(" ").map((val)=>{
        if(val){
            const upd = val && val[0].toUpperCase() + val.slice(1);
            updatedVal.push(upd);
        }
      }).join(" ")
      input.value = updatedVal.join(" ");
}})

form.onsubmit = (e)=>{
    e.preventDefault();
    const value = {};
    inputs.forEach((input)=>{
         value[input.name] = input.value
    })
    value.id = ++uniqueId;
    if(!value.name || !value.age || !value.profession || isNaN(value.age)){
        message.innerHTML = "Error : Please Make sure All the fields are filled before adding in an employee !"
        message.className = "error";
        return;
    }
    if(value.age < 18){
        message.innerHTML = "Error : Entered age should not be less the 18"
        message.className = "error";
        return;
    }

    message.innerHTML = "Success : Employee Added!"
    message.className = "success";
    result.style.opacity="1";
    employees.push(value);
    buildList();
    form.reset();
}

