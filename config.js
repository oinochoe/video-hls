var config = {
    //최대 버퍼 길이 (초). 버퍼 길이가 이 값보다 작거나 작아지면 새 조각이로드됩니다. 이것은 maxBufferSize에 관계없이 hls.js가 도달하려고하는 보장 된 버퍼 길이입니다.
    "maxBufferLength": 100, // 30
    // 최대 버퍼 길이 (초). Hls.js는 maxBufferSize에 아직 도달하지 않은 경우에도 이 값을 초과하지 않습니다. hls.js는 최대 nb 초까지 버퍼링하지 않고 최대 바이트 수 (기본적으로 60MB)까지 버퍼링하려고합니다.
    "maxMaxBufferLength": 3000, // 600
    // '최소'최대 버퍼 크기 (바이트)입니다. 선행 버퍼 크기가 이 값보다 크면 조각이로드되지 않습니다.
    "maxBufferSize": 60 * 1000 * 1000, // 60*1000*1000
    // 로드 할 다음 조각을 검색 할 때 hls.js가 대처할 수있는 '최대'조각 간 버퍼 구멍 허용 오차입니다.
    "maxBufferHole": 0.5, // 0.5
    // 미디어 요소가 재생 될 것으로 예상되고 currentTime이 lowBufferWatchdogPeriod 이상 이동하지 않았고 maxBufferHole 초 미만으로 버퍼링 된 경우 hls.js는 재생을 복구하기 위해 재생 헤드를 조금 이동하려고합니다.
    "lowBufferWatchdogPeriod": 0.5, // 0.5
    // 미디어 요소가 재생 될 것으로 예상되고 currentTime이 highBufferWatchdogPeriod 이상 이동하지 않았고 maxBufferHole 초 이상 버퍼링 된 경우, hls.js는 재생을 복구하기 위해 재생 헤드를 조금 이동하려고 시도합니다.
    "highBufferWatchdogPeriod": 3, // 3
    // 라이브 스트림 재생을 시작하는 데 필요한 세그먼트 수
    "initialLiveManifestSize":2 // 1
}