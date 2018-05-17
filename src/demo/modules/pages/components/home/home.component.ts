import { Component, OnInit } from '@angular/core';
import { LightboxConfigurationService } from '@sveguru/lightbox';

export interface Video{
    youtubeId: string;
    title: string;
    src: string;
    xsSrc: string;
    lgSrc: string;
}
export interface Image{
    title: string;
    src: string;
    xsSrc: string;
    smSrc: string;
    mdSrc: string;
    lgSrc: string;
    xlSrc: string;
}

const VIDEOSLIST: Video[] = [{
    youtubeId: 'Z0FETzb32Hs',
    title: 'Over an hour of 4k Aerial Landscapes with music by Daniel Nietz',
    src: 'http://img.youtube.com/vi/Z0FETzb32Hs/mqdefault.jpg?7',
    xsSrc: 'http://img.youtube.com/vi/Z0FETzb32Hs/mqdefault.jpg?7',
    lgSrc: 'http://img.youtube.com/vi/Z0FETzb32Hs/maxresdefault.jpg?7'
},{
    youtubeId: 'gbrkMDkHRqc',
    title: 'Relax Music - Stunning Snow Mountains Landscapes - 2 Hours - Sleep and Relaxing Instrumental - HD',
    src: 'http://img.youtube.com/vi/gbrkMDkHRqc/mqdefault.jpg?7',
    xsSrc: 'http://img.youtube.com/vi/gbrkMDkHRqc/mqdefault.jpg?7',
    lgSrc: 'http://img.youtube.com/vi/gbrkMDkHRqc/maxresdefault.jpg?7'
},{
    youtubeId: 'Qu8xDIUjFUs',
    title: 'Exploring Canada\'s Landscape',
    src: 'http://img.youtube.com/vi/Qu8xDIUjFUs/mqdefault.jpg?7',
    xsSrc: 'http://img.youtube.com/vi/Qu8xDIUjFUs/mqdefault.jpg?7',
    lgSrc: 'http://img.youtube.com/vi/Qu8xDIUjFUs/maxresdefault.jpg?7'
}];

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public imagesList: Image[] = [];

    public imagesAmount: number;

    public videosList: Video[] = [];

    public videosAmount: number;

    constructor(
        public config: LightboxConfigurationService
    ) { }

    public ngOnInit(): void {

        this.imagesAmount = 5;
        this._buildImageList();
        this.videosAmount = 3;
        this._buildVideosList();
    }

    public onChangeImagesAmount(value: number): void {
        this.imagesAmount = value;
        this._buildImageList();
    }

    public onChangeVideosAmount(value: number): void {
        this.videosAmount = value;
        this._buildVideosList();
    }

    private _buildImageList(): void {
        this.imagesList = [];
        for(let i = 1; i <= this.imagesAmount; i++){
            this.imagesList.push({
                title: 'Landscape ' + i,
                src: 'assets/images/' + i + '-xs.gif',
                xsSrc: 'assets/images/' + i + '-xs.gif',
                smSrc: 'assets/images/' + i + '-sm.gif',
                mdSrc: 'assets/images/' + i + '-md.gif',
                lgSrc: 'assets/images/' + i + '-lg.gif',
                xlSrc: 'assets/images/' + i + '-xl.gif'
            });
        }
    }

    private _buildVideosList(): void {
        this.videosList = [];
        for(let i = 1; i <= this.videosAmount; i++){
            this.videosList.push(VIDEOSLIST[i-1]);
        }
    }
}
