import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IconService } from '@ant-design/icons-angular';
import {
  BellOutline,
  SettingOutline,
  GiftOutline,
  MessageOutline,
  PhoneOutline,
  CheckCircleOutline,
  LogoutOutline,
  EditOutline,
  UserOutline,
  ProfileOutline,
  WalletOutline,
  QuestionCircleOutline,
  LockOutline,
  CommentOutline,
  UnorderedListOutline,
  ArrowRightOutline,
  GithubOutline
} from '@ant-design/icons-angular/icons';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.css']
})
export class NavRightComponent implements OnInit {
  @Input() styleSelectorToggle!: boolean;
  @Output() Customize = new EventEmitter();
  windowWidth: number = 0;
  screenFull: boolean = true;
  // response!: ViewProfileData;


  constructor(private iconService: IconService) {
    this.windowWidth = window.innerWidth;
    this.iconService.addIcon(
      ...[
        CheckCircleOutline,
        GiftOutline,
        MessageOutline,
        SettingOutline,
        PhoneOutline,
        LogoutOutline,
        UserOutline,
        EditOutline,
        ProfileOutline,
        QuestionCircleOutline,
        LockOutline,
        CommentOutline,
        UnorderedListOutline,
        ArrowRightOutline,
        BellOutline,
        GithubOutline,
        WalletOutline
      ]
    );
  }
  private profileUpdateSubscription!: Subscription;
  ngOnInit(): void {

  }
  profile = [
    {
      icon: 'edit',
      title: 'Edit Profile',
      url: '/users/edit-profile'
    },
    {
      icon: 'user',
      title: 'View Profile',
      url: '/users/view-profile'
    }
  ];


  setting = [
    {
      icon: 'question-circle',
      title: 'Support',
       url: '/fms/support'
    },
    {
      icon: 'user',
      title: 'Account Settings',
       url: '/account-setting/settings'
    },
    {
      icon: 'lock',
      title: 'Privacy Center',
       url: '/privacy-policy/Privacy'
    },
    {
      icon: 'comment',
      title: 'Feedback',
       url: '/feedback/feedback'
    },
    {
      icon: 'unordered-list',
      title: 'History',
       url: ''
    }
  ];


  logout() {
    // this.authService.logout();
  }
  // async getProfile() {  debugger
  //   await this.profileService.getProifileView().subscribe((profileRes) => {
  //     const currentUserId = profileRes?.result?.id;
  //     if (!currentUserId) return this.handleAuthError();
  //     this.profileService.getAllUsers().subscribe((usersRes) => {
  //       const userExists = usersRes?.result?.some((user: { id: number }) => user.id === currentUserId);
  //       if (!userExists) this.handleAuthError();
  //       else console.log('User authenticated');
  //     }, () => this.handleAuthError());
  //   }, () => this.handleAuthError());
  // }
  // private handleAuthError(): void {
  //   this.authService.clearAllLocalStorage();
  //   this.authService.logout();
  // }
  getProfile(){
  }
}
