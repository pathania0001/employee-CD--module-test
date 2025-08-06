
const form = document.querySelector("form")
const inputs = document.querySelectorAll("input");
const result = document.getElementById("result");
const message = document.getElementById("msg");
let employees = [];
const removeEmp = (idx)=>{
    employees = employees.filter((_,index) => index !== idx)
    buildList();
}
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
        deletebtn.onclick = ()=>{removeEmp(index);}
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
      const updatedVal  = value.trim().split(" ").map((val)=>{
        return value ? val[0].toUpperCase() + val.slice(1) : ""
      }).join(" ")
      input.value = updatedVal;
}})

form.onsubmit = (e)=>{
    e.preventDefault();
    const value = {};
    inputs.forEach((input)=>{
         value[input.name] = input.value
    })

    if(!value.name || !value.age || !value.profession || isNaN(value.age) || value.age <= 0){
        message.innerHTML = "Error : Please Make sure All the fields are filled before adding in an employee !"
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

