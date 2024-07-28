<script lang="ts">
  export let weather: { good: boolean, okay: boolean };

  let suggestion = "";

  if (weather.good) {
    suggestion = "여행하기 딱 좋은 날씨네요!";
  } else if (weather.okay) {
    suggestion = "날씨가 안 좋을 수도 있지만, 도전해 볼 가치가 있겠어요!";
  } else {
    suggestion = "흠.. 이때 여기를 여행하는 건 추천하지 않아요.";
  }
</script>

<p>{suggestion}</p>
