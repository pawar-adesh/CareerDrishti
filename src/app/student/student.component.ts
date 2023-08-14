import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ApiService } from '../api.service';
import { Student } from '../shared/student.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VideoPopupComponent } from './video-popup.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
    trigger('flyInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        style({ opacity: 0 }), 
        animate('300ms ease-in', style({ opacity: 1 })), 
      ]),
      transition(':leave', [
        animate('100ms ease-out', style({ opacity: 0 })), 
      ])
    ])
  ],
  
})

export class StudentComponent implements OnInit, AfterViewInit  {
  homeStatus = 'active';
  aboutStatus = 'not-active';
  fieldStatus = 'not-active';
  teStatus = 'not-active';
  allSchools: any;
  notRegistered: boolean = false;
  formValue!: FormGroup;
  show1: boolean = false;
  show2: boolean = false;
  show3: boolean = false;
  show4: boolean = false;
  show5: boolean = false;
  show6: boolean = false;
  show7: boolean = false;
  isRegistered: boolean = false;
  isNavbarWhite = false;
  showScrollButton = false;
  navbarCollapsed = true;
  studentData: any;
  emailData: string[] = [];
  public studentObj = new Student();
  showDescription = false;
  FormData: FormGroup | undefined;
  otherShowDescription = false;
  items = [
    { imageUrl: '../../assets/images/agriculture.svg', name: 'agriculture', description: 'Agriculture careers are professional paths related to farming, dairy, poultry, and animal husbandry. BSc Agriculture is a 3 year UG course providing all the scientific methods and techniques of agriculture. Students after completing BSc...' },
    { imageUrl: '../../assets/images/geography-teacher-teaching-while-pointing-towards-earth-map.svg', name: 'Arts & Humanities', description: 'Arts and humanities are broad topics that include the fine, visual, and performing arts and areas of study regarding the human race. Many professionals pursue fine arts or humanities degrees to increase their competitive advantage in the job market. After 12...' },
    { imageUrl: '../../assets/images/interest-loan-calculator.svg', name: 'Commerce', description: 'Planning a career in business? Traditionally, trade is seen as the process of facilitating the exchange of goods, services, or valuables between two parties. As a country, however, we have grown far beyond that. Now the field is not limited to the exchange of goods but...' },
    { imageUrl: '../../assets/images/paint.svg', name: 'Fine Arts', description: 'The term "fine art" refers to an art form used primarily for its aesthetic and aesthetic value rather than its practical value. The fine arts are based on art and design, such as painting, printmaking, and ...' },
    // Add more items as needed
  ];
  otherItems = [
    { imageUrl: '../../assets/images/operation-theatre.svg', name: 'Health & Life Sciences', description: 'Health education improves the health of individuals, families, communities, states and nations. Health education is the study of health that uses biological, environmental, psychological, physical and medical sciences to promote health and ...' },
    { imageUrl: '../../assets/images/website-maintainance (1).svg', name: 'Technical', description: 'Engineering combines science and mathematics to solve real-world problems that improve the world around ...' },
    { imageUrl: '../../assets/images/police.svg', name: 'Uniformed Serevices', description: 'Uniformed public service is effective and gets the job done. The industry is made up of key players who help support and protect the public and enable you to make a real difference. Uniforms are various garments ...' },
    // Add more items for the second row
  ];

  // currentItem: any;
  hoveredIndex: number = -1;
  otherHoveredIndex: number = -1;
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {}

  customOptions: OwlOptions = {
    loop: true,
    items: 1,
    dots: true,
    nav: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    animateOut: 'fadeOut',
    center: true,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1200: {
        items: 3,
      },
    },
  }
  
  ngOnInit(): void {
    // console.log("nav:" , this.isNavbarWhite);
    this.formValue = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      schoolname: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
    });
    this.checkUser();
    this.getStudentsData();
    this.getSchools();
    localStorage.clear();
    this.FormData = this.formBuilder.group({
      Fullname: ['', Validators.required],
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      Comment: ['', Validators.required]
      })
  }

  ngAfterViewInit(): void {
    AOS.init();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.updateNavbarBackground();
    this.isAtHeroSection();
    // this.showScrollButton = window.scrollY > 300;
  }
  
    private updateNavbarBackground() {
      console.log("Change NAVBAR!!!!!!!!!");;
      const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.isNavbarWhite = offset > 40; // Adjust the value based on when you want the color change to occur
    }

  isAtHeroSection() {
    const heroSection = document.getElementById('hero-section');
    const offset = heroSection ? heroSection.offsetTop : 0;
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    if(scrollPosition > offset + 100){
      this.showScrollButton=true;
    }
    else{
      this.showScrollButton=false;
    }
    console.log(this.showScrollButton," scroll");
    // If the user is in the hero section, return true, else false.
    return scrollPosition < offset + 50;
  }

  toggleNavbarCollapse() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
  
  itsHome() {
    this.homeStatus = 'active';
    this.aboutStatus = 'not-active';
    this.fieldStatus = 'not-active';
    this.teStatus = 'not-active';
  }
  itsAbout() {
    this.homeStatus = 'not-active';
    this.aboutStatus = 'active';
    this.fieldStatus = 'not-active';
    this.teStatus = 'not-active';
  }
  itsField() {
    this.homeStatus = 'not-active';
    this.aboutStatus = 'not-active';
    this.fieldStatus = 'active';
    this.teStatus = 'not-active';
  }
  itsTesti() {
    this.homeStatus = 'not-active';
    this.aboutStatus = 'not-active';
    this.fieldStatus = 'not-active';
    this.teStatus = 'active';
  }
  showText(index: number) {
    this.hoveredIndex = index;
  }

  hideText(index: number) {
      this.hoveredIndex = -1;
  }

  showOtherText(index: number) {
    this.otherHoveredIndex = index;
  }

  hideOtherText(index: number) {
      this.otherHoveredIndex = -1;
  }
  closeBtn1() {
    this.show1 = false;
    this.show2 = false;
    this.show3 = false;
  }
  closeBtn2() {
    this.show4 = false;
    this.show5 = false;
    this.show6 = false;
    this.show7 = false;
  }
  showf1() {
    this.show1 = true;
    this.show2 = false;
    this.show3 = false;
  }
  showf2() {
    this.show2 = true;
    this.show1 = false;
    this.show3 = false;
  }
  showf3() {
    this.show3 = true;
    this.show2 = false;
    this.show1 = false;
  }
  showf4() {
    this.show4 = true;
    this.show5 = false;
    this.show6 = false;
    this.show7 = false;
  }
  showf5() {
    this.show5 = true;
    this.show4 = false;
    this.show6 = false;
    this.show7 = false;
  }
  showf6() {
    this.show6 = true;
    this.show4 = false;
    this.show5 = false;
    this.show7 = false;
  }
  showf7() {
    this.show7 = true;
    this.show4 = false;
    this.show6 = false;
    this.show5 = false;
  }

  checkUser() {
    // var emailID = this.formValue.value.email.toLowerCase();
    sessionStorage.setItem('user', this.formValue.value.email);
    // this.router.navigateByUrl('/test');
  }

  openVideo(videoUrl: string) {
    const dialogRef = this.dialog.open(VideoPopupComponent, {
      width: '600px',
      data: { videoUrl },
    });
  }


  getStudentsData() {
    this.api.getStudents().subscribe((res) => {
      this.emailData = res.studentDetails;
      // console.log("result: ",res);
      res.studentDetails.forEach((element: any) => {
        this.emailData.push(element.email);
      });
      // console.log("Emails",this.studentData);
    });
  }
  registerStudent() {
    // this.addStudent();
    this.isRegistered = true;
    // console.log(this.studentObj);
  }

  // addStudent() {
  //   this.studentObj.firstname =
  //     this.formValue.value.firstName.charAt(0).toUpperCase() +
  //     this.formValue.value.firstName.slice(1);
  //   this.studentObj.middlename =
  //     this.formValue.value.middleName.charAt(0).toUpperCase() +
  //     this.formValue.value.middleName.slice(1);
  //   this.studentObj.lastname =
  //     this.formValue.value.lastName.charAt(0).toUpperCase() +
  //     this.formValue.value.lastName.slice(1);
  //   this.studentObj.email = this.formValue.value.email;
  //   this.studentObj.schoolname = this.formValue.value.schoolname;
  //   this.studentObj.mobile = this.formValue.value.mobile;
  //   this.studentObj.city = this.formValue.value.city;
  //   console.log("stidentObj, ",this.studentObj );
  //   this.api.addStudent(this.studentObj).subscribe((res) => {
  //     alert('starting test');
  //     console.log(res);
  //     // this.showForm=true;
  //   }
  //   );
  // }

  selected = '----';
  update(e: any) {
    this.selected = e.target.value;
  }
  getSchools() {
    this.api.getSchools().subscribe((r) => {
      this.allSchools = r.schoolDetails;
      // console.log(this.allSchools);
    });
  }

  openTab(index: number): void {
    this.router.navigate(['/exploreFields'], {
      queryParams: { tabIndex: index },
    });
    window.scrollTo(0, 0);
  }
}
