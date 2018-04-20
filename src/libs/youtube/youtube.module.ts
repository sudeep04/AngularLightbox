import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeApiService } from './services/youtube-api.service';
import { YoutubePlayerService } from './services/youtube-player.service';
import { YoutubeComponent } from './components/youtube.component';

@NgModule({
    providers: [
        YoutubeApiService,
        YoutubePlayerService
    ],
    declarations: [
        YoutubeComponent
    ],
    exports: [
        YoutubeComponent
    ]
})
export class YoutubeModule { }
