import React from "react";
import { Text, View } from "react-native";
import BBS from "../../components/BBS";

export default function GuestBoard() {
  const content = [
    "1006번 시간표 변경 관련",
    "정류소 명칭 변경 알림",
    "경진여객운수 '고객의 소리' 오픈",
  ];
  const content2 = [
    "[8472번] 무정차 신고합니다.",
    "[1006번] 🤬 차량이 오지 않습니다!!!",
    "[7800번] 매번 탈 때마다 만석버스...",
  ];
  const content3 = [
    "작성자와 관리자만 확인 가능합니다.",
    "정류소 명칭 변경 건의",
    "",
  ];
  const dateList = ["07/01", "06/25", "05/28"];
  const dateList2 = ["07/04", "06/21", "06/05"];
  const dateList3 = ["06/23", "06/22", ""];
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        padding: 30,
      }}
    >
      <BBS title="공지사항" content={content} dateList={dateList} />
      <BBS title="이용 불편사항" content={content2} dateList={dateList2} />
      <BBS title="건의사항" content={content3} dateList={dateList3} />
    </View>
  );
}
