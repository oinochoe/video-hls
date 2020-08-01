# ffmpeg usage

- ffmpeg -i hasashin.mp4 -b:v 1M -g 60 -hls_time 2 -hls_list_size 0 -hls_segment_size 500000 output.m3u8

## ffmpeg options

-