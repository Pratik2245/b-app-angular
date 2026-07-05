import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { User } from '../../services/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  private userService = inject(User);
  private cdr = inject(ChangeDetectorRef);

  user: any = {};

  username = '';
  email = '';
  bio = '';

  isLoading = false;

  selectedFile: File | null = null;

  imagePreview: string | ArrayBuffer | null = null;

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {

    this.isLoading = true;

    this.userService.getProfile().subscribe({

      next: (res: any) => {

        this.user = res;

        this.username = res.username;

        this.email = res.email;

        this.bio = res.bio || '';

        if (res.profileImage) {
          this.imagePreview =
            'http://localhost:3001' + res.profileImage;
        }

        this.isLoading = false;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error(err);

        this.isLoading = false;

        this.cdr.detectChanges();

      }

    });

  }

  updateProfile(): void {

    const data = {

      username: this.username,

      bio: this.bio

    };

    this.userService
      .updateProfile(data)
      .subscribe({

        next: (res: any) => {

          this.user = res;

          alert("Profile Updated Successfully");

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  uploadImage(): void {
    if (!this.selectedFile) {
      alert('Please select an image first');
      return;
    }

    this.userService.uploadProfileImage(this.selectedFile).subscribe({
      next: (res: any) => {
        const imagePath = res.imageUrl || res.imageUrl || res.url;
        if (!imagePath) {
          alert('Image upload failed');
          return;
        }

        this.userService.updateProfile({ profileImage: imagePath }).subscribe({
          next: (updatedUser: any) => {
            this.user = updatedUser;
            this.imagePreview = 'http://localhost:3001' + imagePath;
            this.selectedFile = null;
            alert('Profile image updated successfully');
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error(err);
            alert('Failed to save profile image');
          }
        });
      },
      error: (err) => {
        console.error(err);
        alert('Image upload failed');
      }
    });
  }

  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.selectedFile = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {

      this.imagePreview = reader.result;

      this.cdr.detectChanges();

    };

    reader.readAsDataURL(this.selectedFile);

  }

}