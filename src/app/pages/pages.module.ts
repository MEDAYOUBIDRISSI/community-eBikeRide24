import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { IndexComponent } from './community/index/index.component';
import { ContactsComponent } from './community/components/contacts/contacts.component';
import { 
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule,
  NbIconModule, NbPopoverModule, NbSearchModule,
  NbAlertModule,
  NbDatepickerModule,
} from '@nebular/theme';
import { NewPostComponent } from './community/components/new-post/new-post.component';
import { PostsComponent } from './community/components/posts/posts.component';
import { ProfileComponent } from './community/profile/profile.component';
import { NewsPostsComponent } from './community/components/posts/news-posts/news-posts.component';
import { NewsPostsPlaceholderComponent } from './community/components/posts/news-posts-placeholder/news-posts-placeholder.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    NbIconModule, 
    NbPopoverModule, 
    NbSearchModule,
    NbAlertModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    FormsModule,
    ReactiveFormsModule,
    NbDatepickerModule,
  ],
  declarations: [
    PagesComponent,
    IndexComponent,
    ContactsComponent,
    NewPostComponent,
    PostsComponent,
    ProfileComponent,
    NewsPostsComponent,
    NewsPostsPlaceholderComponent
  ],
})
export class PagesModule {
}
