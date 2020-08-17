# ffmpeg usage

- 2020-08-17
-- ffmpeg -i bunny_158.mp4 -b:v 1M -g 60 -hls_time 0 -hls_list_size 0 -hls_init_time 300 -hls_segment_size 500000 bunny_5mb_test.m3u8

- at first
-- ffmpeg -i hasashin.mp4 -b:v 1M -g 60 -hls_time 2 -hls_list_size 0 -hls_segment_size 500000 output.m3u8

# ffmpeg options

### hls_init_time *seconds* (중요)
초기 대상 세그먼트 길이를 초 단위로 설정합니다.
기본값은 0입니다.
첫 번째 m3u8 목록에서 이 시간이 지나면 다음 키 프레임에서 세그먼트가 잘립니다.
초기 재생 목록이 채워지면 ffmpeg는 hls_time과 동일한 기간에 세그먼트를 자릅니다.

### hls_time *seconds* (중요)
대상 세그먼트 길이를 초 단위로 설정합니다.
기본값은 2입니다.
이 시간이 지나면 다음 키 프레임에서 세그먼트가 잘립니다.

### hls_list_size *size* (중요)
최대 재생 목록 항목 수를 설정합니다.
0으로 설정하면 목록 파일에 모든 세그먼트가 포함됩니다.
기본값은 5입니다.

참고. hls_list_size 0을 사용하여 재생 목록의 모든 세그먼트를 유지합니다.
     0보다 큰 값을 사용하면 재생 목록이 hls_list_size 길이의 슬라이딩 창을 사용합니다.
     또한 -hls_time 1을 사용하면 재생 목록 파일 크기가 크게 늘어납니다.
     Apple 권장 값은 10초이므로 원하는 키 프레임 간격의 배수로 늘려야합니다.

### hls_delete_threshold *size* (중요)
hls_flags delete_segments가 세그먼트를 삭제하기 전에 디스크에 보관할 참조되지 않은 세그먼트 수를 설정합니다.
클라이언트가 최근 재생 목록에서 참조된 세그먼트를 계속 다운로드할 수 있도록하려면 이 값을 늘립니다.
기본값은 1이며 hls_list_size + 1보다 오래된 세그먼트가 삭제됨을 의미합니다.
이 뜻은, 결국 사용자가 임의로 이동을 했을 때 다음 세그먼트 빼고는 디스크에서 계속 들고있지 않는다는 의미입니다.

### hls_ts_options *options_list*
:로 구분 된 key = value 매개 변수 목록을 사용하여 출력 형식 옵션을 설정합니다. :을 포함하는 특수 문자는 이스케이프되어야합니다.

### hls_wrap wrap(deprecated)
이것은 더 이상 사용되지 않는 옵션입니다.
대신 hls_list_size 및 hls_flags delete_segments를 사용할 수 있습니다.
이 옵션은 디스크를 많은 세그먼트 파일로 채우는 것을 방지하고 랩핑할 디스크에 기록되는 최대 세그먼트 파일수를 제한하는 데 유용합니다.

### hls_start_number_source
지정된 소스에 따라 재생목록 시퀀스 번호(#EXT-X-MEDIA-SEQUENCE)를 시작합니다.
hls_flags single_file이 설정되지 않은 경우 세그먼트 및 자막 파일 이름의 시작 시퀀스 번호 소스도 지정합니다.
어쨌든 hls_flags append_list가 설정되고 읽기 재생 목록 시퀀스 번호가 지정된 시작 시퀀스 번호보다 크면 해당값이 시작값으로 사용됩니다.

generic (default)
Set the starting sequence numbers according to start_number option value.

epoch
The start number will be the seconds since epoch (1970-01-01 00:00:00)

epoch_us
The start number will be the microseconds since epoch (1970-01-01 00:00:00)

datetime
The start number will be based on the current date/time as YYYYmmddHHMMSS. e.g. 20161231235759.

### start_number *number*
hls_start_number_source 값이 generic이면 지정된 번호에서 재생 목록 시퀀스 번호(#EXT-X-MEDIA-SEQUENCE)를 시작합니다. (이것은 기본 케이스입니다.)
hls_flags single_file이 설정되지 않은 경우 세그먼트 및 자막 파일 이름의 시작 시퀀스 번호도 지정합니다.
기본값은 0입니다.

### hls_allow_cache *allowcache*
클라이언트가 미디어 세그먼트를 캐시 할 수 있는지(1) 또는 캐시하면 안되는지 (0) 명시적으로 설정합니다.

### hls_base_url *baseurl*
재생 목록의 모든 항목에 baseurl을 추가합니다.
절대 경로가있는 재생 목록을 생성하는데 유용합니다.
재생 목록 시퀀스 번호는 각 세그먼트에 대해 고유해야하며 순환할 수있는 세그먼트 파일 이름 시퀀스 번호와 혼동하지 않아야합니다 (예 : wrap 옵션이 지정된 경우).

### hls_segment_filename *filename*
세그먼트 파일 이름을 설정합니다. hls_flags single_file이 설정되지 않은 경우 파일 이름은 세그먼트 번호가있는 문자열 형식으로 사용됩니다.

```
ffmpeg -i in.nut -hls_segment_filename 'file%03d.ts' out.m3u8
```
위 코드는 file000.ts, file001.ts, file002.ts 이런식으로 나타날 것입니다.
var_stream_map이 둘 이상의 변형 스트림으로 설정된 경우 파일 이름 패턴에 문자열 "% v"가 포함되어야합니다.이 문자열은 생성 된 세그먼트 파일 이름에서 변형 스트림 인덱스의 위치를 지정합니다.
```
ffmpeg -i in.ts -b:v:0 1000k -b:v:1 256k -b:a:0 64k -b:a:1 32k \
  -map 0:v -map 0:a -map 0:v -map 0:a -f hls -var_stream_map "v:0,a:0 v:1,a:1" \
  -hls_segment_filename 'vs%v/file_%03d.ts' vs%v/out.m3u8
```
vs0/file_000.ts, vs0/file_001.ts, vs0/file_002.ts, 등등, 그리고 vs1/file_000.ts, vs1/file_001.ts, vs1/file_002.ts 이런식으로 나타나게됩니다.


### use_localtime(deprecated)
strftime 옵션과 동일하며 더 이상 사용되지 않습니다.

### strftime
파일 이름에 strftime()을 사용하여 세그먼트 파일 이름을 localtime으로 확장하십시오.
세그먼트 번호는 이 모드에서도 사용할 수 있지만 이를 사용하려면 second_level_segment_index hls_flag를 지정해야하며 %%d가 지정자가 됩니다.

```
ffmpeg -i in.nut -strftime 1 -hls_flags second_level_segment_index -hls_segment_filename 'file-%Y%m%d-%%04d.ts' out.m3u8
```
file-20160215-0001.ts, file-20160215-0002.ts 이런식으로 노출됩니다.

### use_localtime_mkdir(deprecated)
strftime_mkdir 옵션과 동일하며 더 이상 사용되지 않습니다.

### strftime_mkdir
strftime과 마찬가지로 파일 이름으로 확장 된 모든 하위 디렉토리를 생성합니다
```
ffmpeg -i in.nut -strftime 1 -strftime_mkdir 1 -hls_segment_filename '%Y/%m/%d/file-%Y%m%d-%s.ts' out.m3u8
```

이 예에서는 2016/02/15 디렉터리 계층 구조 (존재하지 않는 경우)를 만든 다음 재생목록, out.m3u8 및 세그먼트 파일을 생성합니다.
2016/02/15/file-20160215-1455569023.ts, 2016/02/15/file-20160215-1455569024.ts 등

### hls_key_info_file *key_info_file*
세그먼트 암호화를 위해 key_info_file의 정보를 사용 합니다.
key_info_file의 첫 번째 줄은 재생 목록에 기록된 키 URI를 지정합니다.
키 URL은 재생 중에 암호화 키에 액세스하는 데 사용됩니다.
두 번째 줄은 암호화 프로세스 중에 키를 얻는데 사용되는 키 파일의 경로를 지정합니다.
키 파일은 바이너리 형식의 16옥텟의 단일 패킹된 배열로 읽힙니다.
선택적 세 번째 행은 암호화에 세그먼트 시퀀스 번호(기본값)대신 사용할 16진수 문자열로 초기화 벡터(IV)를 지정합니다.
key_info_file을 변경하면 hls_flags periodic_rekey가 활성화 된 경우 새키 / IV 및 새키 URI / IV에 대한 재생 목록 항목으로 세그먼트가 암호화됩니다.

shell script 예시
```
#!/bin/sh
BASE_URL=${1:-'.'}
openssl rand 16 > file.key
echo $BASE_URL/file.key > file.keyinfo
echo file.key >> file.keyinfo
echo $(openssl rand -hex 16) >> file.keyinfo
ffmpeg -f lavfi -re -i testsrc -c:v h264 -hls_flags delete_segments \
  -hls_key_info_file file.keyinfo out.m3u8
```

### hls_enc *enc*
AES128 암호화를 활성화(1) 또는 비활성화(0)합니다.
활성화되면 생성된 모든 세그먼트가 암호화되고 암호화키가 재생 목록 이름.
키로 저장됩니다.

### hls_enc_key *key*
세그먼트를 암호화하는 16바이트 키는 기본적으로 무작위로 생성됩니다.

### hls_enc_key_url *keyurl*
설정된 경우 재생 목록의 키 파일 이름에 baseurl 대신 keyurl이 추가됩니다.

### hls_enc_iv *iv*
자동 생성된 세그먼트 대신 모든 세그먼트에 대해 16바이트로 코딩된 16바이트 초기화 벡터.

### hls_segment_type *flags*(중요)
`mpegts`
MPEG-2 전송 스트림 형식의 출력 세그먼트 파일. 이것은 모든 HLS 버전과 호환됩니다.

`fmp4`
MPEG-DASH와 유사한 조각화된 MP4 형식의 출력 세그먼트 파일.
fmp4 파일은 HLS 버전7 이상에서 사용할 수 있습니다.

### hls_fmp4_init_filename *filename*
파일 이름을 조각 파일 헤더 파일로 설정합니다.
기본 파일 이름은 init.mp4입니다.

### hls_fmp4_init_resend
매번 m3u8 파일을 새로 고친 후 초기화 파일을 다시 보냅니다. 기본값은 0입니다.
var_stream_map이 둘 이상의 변형 스트림으로 설정된 경우 파일 이름 패턴에 문자열 "% v"가 포함되어야합니다.
이 문자열은 생성 된 초기화 파일 이름에서 변형 스트림 인덱스의 위치를 지정합니다.
문자열 "% v"는 파일 이름 또는 파일이 포함 된 마지막 디렉토리 이름에있을 수 있습니다.
디렉토리 이름에 문자열이 있으면 디렉토리 이름 패턴을 확장 한 후 하위 디렉토리가 생성됩니다.
이를 통해 하위 디렉터리의 다양한 변형 스트림에 해당하는 init 파일을 만들 수 있습니다.

### hls_flags *flags*
`single_file`
이 플래그가 설정되면 muxer는 모든 세그먼트를 단일 MPEG-TS 파일에 저장하고 재생 목록에서 바이트 범위를 사용합니다.
이 방법으로 생성 된 HLS 재생 목록의 버전 번호는 4입니다.

```
ffmpeg -i in.nut -hls_flags single_file out.m3u8
```
재생 목록 out.m3u8과 단일 세그먼트 파일 out.ts를 생성합니다.

`delete_segments`
재생 목록에서 제거 된 세그먼트 파일은 세그먼트 지속 시간과 재생 목록 지속 시간을 더한 시간이 지나면 삭제됩니다.

`append_list`
새 세그먼트를 이전 세그먼트 목록 끝에 추가하고 이전 세그먼트 목록에서 #EXT-X-ENDLIST를 제거합니다.

`round_durations`
부동 소수점을 사용하는 대신 재생 목록 파일 세그먼트 정보의 기간 정보를 정수값으로 반올림합니다.

`discont_start`
재생 목록의 첫 번째 세그먼트 정보 앞에 ### EXT-X-DISCONTINUITY 태그를 추가합니다.

`omit_endlist`
재생 목록 끝에 EXT-X-ENDLIST 태그를 추가하지 마십시오.

`periodic_rekey`
hls_key_info_file에 지정된 파일은 주기적으로 확인되며 암호화 정보에 대한 업데이트를 감지합니다.
AES 암호화 키가 포함 된 파일을 포함하여 이 파일을 원자단위로 교체해야합니다.

`independent_segments`
비디오 세그먼트가있는 재생 목록에 #EXT-X-INDEPENDENT-SEGMENTS를 추가하고 해당 재생 목록의 모든 세그먼트가 키 프레임으로 시작되도록 보장합니다.

`iframes_only`
동영상 세그먼트가 있고 #EXT-X-BYTERANGE 모드에서 iframe만 재생할 수있는 재생 목록에 #EXT-X-I-FRAMES-ONLY를 추가합니다.

`split_by_time`
키 프레임이 아닌 다른 프레임에서 세그먼트를 시작할 수 있습니다.
이렇게하면 키 프레임 사이의 시간이 일치하지 않을 때 일부 플레이어의 동작이 개선되지만 다른 플레이어에서는 상황이 악화 될 수 있으며 탐색 중에 약간의 이상이 발생할 수 있습니다.
이 플래그는 hls_time 옵션과 함께 사용해야합니다.

`program_date_time`
EXT-X-PROGRAM-DATE-TIME 태그를 생성합니다.

`second_level_segment_index`
strftime이 켜져있을 때 날짜, 시간 값 외에 hls_segment_filename 표현식에서 세그먼트 인덱스를 %%d로 사용할 수 있습니다.
후행 0이있는 고정 너비 숫자를 얻으려면 x가 필요한 너비인 %%0xd 형식을 사용할 수 있습니다.

`second_level_segment_size`
strftime이 켜져있을 때 날짜, 시간 값 외에 hls_segment_filename 표현식에서 세그먼트 크기(바이트로 계산)를 %%s로 사용할 수 있습니다.
후행 0이있는 고정 너비 숫자를 얻으려면 x가 필요한 너비 인 %%0xs 형식을 사용할 수 있습니다.

`second_level_segment_duration`
strftime이 켜져있을 때 날짜, 시간 값 외에 hls_segment_filename 표현식에서 세그먼트 기간(마이크로 초 단위로 계산 됨)을 %%t로 사용할 수 있습니다.
후행 0이있는 고정 너비 숫자를 얻으려면 x가 필요한 너비 인 %%0xt 형식을 사용할 수 있습니다.

예시코드
```
ffmpeg -i sample.mpeg \
   -f hls -hls_time 3 -hls_list_size 5 \
   -hls_flags second_level_segment_index+second_level_segment_size+second_level_segment_duration \
   -strftime 1 -strftime_mkdir 1 -hls_segment_filename "segment_%Y%m%d%H%M%S_%%04d_%%08s_%%013t.ts" stream.m3u8
```
이렇게하면 segment_20170102194334_0003_00122200_0000003000000.ts, segment_20170102194334_0004_00120072_0000003000000.ts 등의 세그먼트가 생성됩니다

`temp_file`
세그먼트 데이터를 filename.tmp에 쓰고 세그먼트가 완료된 후에만 파일 이름으로 이름을 바꿉니다.
세그먼트를 제공하는 웹 서버는 m3u8 재생 목록에 추가되기 전에 진행중인 세그먼트에 대한 액세스를 방지하기 위해 * .tmp에 대한 요청을 거부하도록 구성 할 수 있습니다.
이 플래그는 m3u8 재생 목록 파일이 생성되는 방식에도 영향을줍니다.
이 플래그가 설정되면 모든 재생 목록 파일이 임시 파일에 기록되고 세그먼트가 처리되는 것처럼 완료 후 이름이 변경됩니다.
그러나 파일 프로토콜과 vod 이외의 유형 (hls_playlist_type)을 가진 재생 목록은 이 플래그와 관계없이 항상 임시 파일에 기록됩니다.
master_pl_publish_rate 값이 0이 아닌 경우 파일 프로토콜이있는 마스터 재생 목록 파일 (master_pl_name)은이 플래그에 관계없이 항상 임시 파일에 기록됩니다.

### hls_playlist_type *event*
m3u8 헤더에서 #EXT-X-PLAYLIST-TYPE : EVENT를 내보냅니다.
hls_list_size를 0으로 강제합니다.
재생 목록만 추가 할 수 있습니다.

### hls_playlist_type *vod*
m3u8 헤더에서 #EXT-X-PLAYLIST-TYPE : VOD를 내보냅니다.
hls_list_size를 0으로 강제합니다.
재생 목록은 변경되지 않아야합니다.

### method
주어진 HTTP 메서드를 사용하여 hls 파일을 만듭니다.
```
ffmpeg -re -i in.ts -f hls -method PUT http://example.com/live/out.m3u8
```
이 예제는 HTTP PUT 방법을 사용하여 모든 mpegts 세그먼트 파일을 HTTP 서버에 업로드하고 동일한 방법을 사용하여 새로 고침 시간마다 m3u8 파일을 업데이트합니다.
HTTP 서버는 파일 업로드를 위해 주어진 방법을 지원해야합니다.

### http_user_agent
HTTP 헤더의 User-Agent 필드를 재정의합니다. HTTP 출력에만 적용됩니다.

### var_stream_map
오디오, 비디오 및 자막 스트림을 다른 변형 스트림으로 그룹화하는 방법을 지정하는 매핑 문자열입니다.
변형 스트림 그룹은 공백으로 구분됩니다.
예상되는 문자열 형식은 "a : 0, v : 0 a : 1, v : 1 ...."과 같습니다.
여기서 a :, v :, s :는 각각 오디오, 비디오 및 자막 스트림을 지정하는 키입니다.
허용되는 값은 0 ~ 9입니다 (실제 사용에 따라 제한됨).
둘 이상의 변형 스트림이있는 경우 출력 파일 이름 패턴에 문자열 "%v"가 포함되어야합니다.
이 문자열은 출력 미디어 재생 목록 파일 이름에서 변형 스트림 인덱스의 위치를 지정합니다.
문자열 "%v"는 파일 이름 또는 파일이 포함 된 마지막 디렉토리 이름에있을 수 있습니다.
디렉토리 이름에 문자열이 있으면 디렉토리 이름 패턴을 확장 한 후 하위 디렉토리가 생성됩니다.
이를 통해 하위 디렉터리에 변형 스트림을 만들 수 있습니다.

```
ffmpeg -re -i in.ts -b:v:0 1000k -b:v:1 256k -b:a:0 64k -b:a:1 32k \
  -map 0:v -map 0:a -map 0:v -map 0:a -f hls -var_stream_map "v:0,a:0 v:1,a:1" \
  http://example.com/live/out_%v.m3u8
```

이 예에서는 두 개의 hls 변형 스트림을 만듭니다.
첫 번째 변형 스트림은 비트 레이트 1000k의 비디오 스트림과 비트 레이트 64k의 오디오 스트림을 포함하고 두 번째 변형 스트림은 비트 레이트 256k의 비디오 스트림과 비트 레이트 32k의 오디오 스트림을 포함합니다.
여기에서 파일 이름이 out_0.m3u8 및 out_1.m3u8 인 두 개의 미디어 재생 목록이 생성됩니다.
결과이름에 색인 대신에 의미있는 텍스트를 원하는 경우 다음 예제와 같이 각 또는 일부 변형에 대한 이름을 지정할 수 있습니다.

```
ffmpeg -re -i in.ts -b:v:0 1000k -b:v:1 256k -b:a:0 64k -b:a:1 32k \
  -map 0:v -map 0:a -map 0:v -map 0:a -f hls -var_stream_map "v:0,a:0,name:my_hd v:1,a:1,name:my_sd" \
  http://example.com/live/out_%v.m3u8
```

기본적으로 모든 인코딩된 스트림을 포함하는 단일 hls 변형이 생성됩니다.

```
ffmpeg -y -i input_with_subtitle.mkv \
 -b:v:0 5250k -c:v h264 -pix_fmt yuv420p -profile:v main -level 4.1 \
 -b:a:0 256k \
 -c:s webvtt -c:a mp2 -ar 48000 -ac 2 -map 0:v -map 0:a:0 -map 0:s:0 \
 -f hls -var_stream_map "v:0,a:0,s:0,sgroup:subtitle" \
 -master_pl_name master.m3u8 -t 300 -hls_time 10 -hls_init_time 4 -hls_list_size \
 10 -master_pl_publish_rate 10  -hls_flags \
 delete_segments+discont_start+split_by_time ./tmp/video.m3u8
```

이 예에서는 webvtt 자막 그룹 이름이`subtitle`인 마스터 재생 목록에 TYPE = SUBTITLES 인 ### EXT-X-MEDIA 태그를 추가합니다.
입력 파일에 최소한 하나의 텍스트 자막 스트림이 있는지 확인하십시오.

### cc_stream_map
다른 폐쇄 캡션 그룹 및 해당 속성을 지정하는 맵 문자열입니다.
자막 스트림 그룹은 공백으로 구분됩니다.
예상되는 문자열 형식은 "ccgroup :, instreamid :, language : ...."와 같습니다.
`ccgroup`및`instreamid`는 필수 속성입니다.
'언어'는 선택적 속성입니다.
이 옵션을 사용하여 구성된 자막 그룹은 var_stream_map 문자열에 동일한 'ccgroup'이름을 제공하여 다른 변형 스트림에 매핑됩니다.
var_stream_map이 설정되지 않은 경우 cc_stream_map에서 사용 가능한 첫 번째 ccgroup이 출력 변형 스트림에 매핑됩니다.
이 두 가지 사용 사례의 예가 아래에 나와 있습니다.

```
ffmpeg -re -i in.ts -b:v 1000k -b:a 64k -a53cc 1 -f hls \
  -cc_stream_map "ccgroup:cc,instreamid:CC1,language:en" \
  -master_pl_name master.m3u8 \
  http://example.com/live/out.m3u8
```
이 예에서는 그룹 이름`cc`, 언어`en`(영어) 및 INSTREAM-ID`CC1`을 사용하여 마스터 재생 목록에 TYPE = CLOSED-CAPTIONS 인 ### EXT-X-MEDIA 태그를 추가합니다.
또한 출력 변형 스트림에 대해 그룹 이름이 'cc'인 CLOSED-CAPTIONS 속성을 추가합니다.

### master_pl_name
주어진 이름으로 HLS 마스터 재생 목록을 만듭니다.
```
ffmpeg -re -i in.ts -f hls -master_pl_name master.m3u8 http://example.com/live/out.m3u8
```
이 예에서는 master.m3u8이라는 이름의 HLS 마스터 재생 목록을 만들고 http://example.com/live/에 게시합니다.

### master_pl_publish_rate
지정된 수의 세그먼트 간격 후에 마스터 재생 목록을 반복적으로 게시합니다.

```
ffmpeg -re -i in.ts -f hls -master_pl_name master.m3u8 \
-hls_time 2 -master_pl_publish_rate 30 http://example.com/live/out.m3u8
```
이 예에서는 master.m3u8이라는 이름의 HLS 마스터 재생 목록을 만들고 30 세그먼트 이후 (예 : 60 초 이후)마다 반복해서 게시합니다.

### http_persistent
지속적인 HTTP 연결을 사용하십시오. HTTP 출력에만 적용됩니다.

### timeout
소켓 I/O 작업에 대한 시간 제한을 설정합니다. HTTP 출력에만 적용됩니다.

### ignore_io_errors
열기, 쓰기 및 삭제 중 IO 오류를 무시합니다.
네트워크 출력으로 장기간 실행하는 데 유용합니다.

### headers
사용자 지정 HTTP 헤더를 설정하고 기본 헤더를 재정의 할 수 있습니다. HTTP 출력에만 적용됩니다.