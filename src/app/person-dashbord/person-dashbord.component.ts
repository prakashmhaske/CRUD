import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../shered/api.service';
import { PersonModel } from './person-dashboard.model';
@Component({
  selector: 'app-person-dashbord',
  templateUrl: './person-dashbord.component.html',
  styleUrls: ['./person-dashbord.component.css']
})
export class PersonDashbordComponent implements OnInit {

  formValue !: FormGroup;
  personModelObj : PersonModel = new PersonModel();
  personData!:any;
  showAdd!:boolean;
  showupdate!:boolean;
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formValue =this.formBuilder.group({
      firstName : [' '],
      lastName : [' '],
      avatar : [' '],
      email: [' '],
      dob: [' '],
      salary: [' ']
    })
    this.getAllPerson();
  }
   clickAddPerson()
   {
     this.formValue.reset();
     this.showAdd = true;
     this.showupdate = false;
   }
  postPersonDetails(){
    this.personModelObj.firstName = this.formValue.value.firstName;
    this.personModelObj.lastName = this.formValue.value.lastName;
    this.personModelObj.avatar = this.formValue.value.avatar;
    this.personModelObj.email = this.formValue.value.email;
    this.personModelObj.dob = this.formValue.value.dob;
    this.personModelObj.salary = this.formValue.value.salary;

    this.api.postPerson(this.personModelObj)
    .subscribe(res=>{
      console.log(res);
      this.toastr.success('Add Person Successfully', 'Add',{
        timeOut:500,

      });
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllPerson();
    },
     err =>{
        alert("Something Went Wrong ");
      })

    }
getAllPerson(){
  this.api.getPerson().subscribe((res:any)=>{
this.personData=res;
  })
}
  deletePerson(row : any)
    {
      this.api.deletePerson(row.id)
      .subscribe(res=>{
        this.toastr.success('Delete Person Successfully', 'Delete',{
          timeOut:500,

        });
        this.getAllPerson();
      })
    }
     onEdit(row : any)
     {
      this.showAdd = false;
      this.showupdate = true;
       this.personModelObj.id = row.id;
       this.personModelObj.id=row.id;
       this.formValue.controls['firstName'].setValue(row.firstName)
       this.formValue.controls['lastName'].setValue(row.lastName)
       this.formValue.controls['avatar'].setValue(row.avatar)
       this.formValue.controls['email'].setValue(row.email)
       this.formValue.controls['dob'].setValue(row.dob)
       this.formValue.controls['salary'].setValue(row.salary)
     }

     updatePersonDetails()
     {
      this.personModelObj.firstName = this.formValue.value.firstName;
      this.personModelObj.lastName = this.formValue.value.lastName;
      this.personModelObj.avatar = this.formValue.value.avatar;
      this.personModelObj.email = this.formValue.value.email;
      this.personModelObj.dob = this.formValue.value.dob;
      this.personModelObj.salary = this.formValue.value.salary;
      this.api.updatePerson(this.personModelObj,this.personModelObj.id)
      .subscribe(res=>{
        this.toastr.success('Update Person Successfully', 'Update',{
          timeOut:1000,

        });
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllPerson();
      })
     }
}
