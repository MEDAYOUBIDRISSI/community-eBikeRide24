import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  fruits:[
    {libelle:"test 1"},
    {libelle:"test 1"},
    {libelle:"test 1"},
    {libelle:"test 1"}
  ]

  users: { name: string, title: string,picture:string }[] = [
    { name: 'Carla Espinosa', title: 'Nurse',picture:"https://via.placeholder.com/50/4479e7/ffffff?Text=IMG" },
    { name: 'Bob Kelso', title: 'Doctor',picture:"https://via.placeholder.com/50/4479e7/ffffff?Text=IMG" },
    { name: 'Janitor', title: 'Janitor',picture:"https://via.placeholder.com/50/4479e7/ffffff?Text=IMG" },
    { name: 'Perry Cox', title: 'Doctor',picture:"https://via.placeholder.com/50/4479e7/ffffff?Text=IMG" },
    { name: 'Ben Sullivan', title: 'Photographer',picture:"https://via.placeholder.com/50/4479e7/ffffff?Text=IMG" },
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
