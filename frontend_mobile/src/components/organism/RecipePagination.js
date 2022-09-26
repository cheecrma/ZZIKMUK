import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";

/*
totalSteps: 총 단계가 들은 배열
checkedIndex: 현재 보고 있는 페이지의 인덱스
check: 보고있는 페이지를 변화시키는 함수
*/

// 단계별 레시피 조회 화면 페이지네이션 바
export default function RecipePagination({ totalSteps, checkedIndex, check }) {
  const [curX, setCurX] = useState(0);

  // 현재 스크롤 좌표 설정
  function handleCurX(x) {
    setCurX(x.nativeEvent.contentOffset.x);
  }

  return (
    <View style={styles.container}>
      {curX >= 40 ? <HiddenPage /> : null}
      <View style={styles.pageContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} onScroll={event => handleCurX(event)}>
          {paging(totalSteps, checkedIndex, check)}
        </ScrollView>
      </View>
      {curX < (totalSteps - 6) * 50 ? <HiddenPage /> : null}
    </View>
  );
}

// 각 페이지 번호 컴포넌트
function Page({ index, checkedIndex, check }) {
  return (
    <Pressable onPress={() => check(index)}>
      <View style={index === checkedIndex ? styles.checkedPage : styles.uncheckedPage}>
        <Text style={index === checkedIndex ? { color: "black", fontSize: 20 } : { color: "#BABABA", fontSize: 20 }}>
          {index + 1}
        </Text>
      </View>
    </Pressable>
  );
}

function paging(totalSteps, checkedIndex, check) {
  const rlt = [];

  for (let i = 0; i < totalSteps; i += 1) {
    rlt.push(<Page index={i} checkedIndex={checkedIndex} check={check} />);
  }

  return rlt;
}

// 페이지네이션에 보이지 않는 페이지가 있는지 확인할 수 있도록 하는 컴포넌트
function HiddenPage() {
  return <View style={styles.hiddenPage}></View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pageContainer: {
    flexDirection: "row",
    width: 220,
    marginHorizontal: 8,
  },
  checkedPage: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: "#FFE48E",
    borderColor: "#FF8B34",
    marginHorizontal: 7,
  },
  uncheckedPage: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: "white",
    borderColor: "#BABABA",
    marginHorizontal: 7,
  },
  hiddenPage: {
    backgroundColor: "#BABABA",
    width: 8,
    height: 8,
    borderRadius: 5,
  },
});
