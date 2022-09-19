import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function explainIcon({ difficulty, people, time, purpose }) {

  return (
    <View 
      style={{...styles.explainIcon, 
              width: purpose === 'card' ? '20%' : '12%',
              backgroundColor: purpose === 'card' ? '#FDB954' : 'white',
              borderRadius: purpose === 'card' ? 5 : 10,
            }}
    >
      {
        difficulty ? 
        <MaterialCommunityIcons 
          name={difficulty === 'hard' ? 'speedometer' : 
                difficulty === 'normal' ? 'speedometer-medium' :
                'speedometer-slow'} 
          size={24} 
          color={purpose === 'card' ? 'white' : 'black'}
        />

        :

        people ?
        <Ionicons 
        name="people-sharp" 
        size={24} 
        color={purpose === 'card' ? 'white' : 'black'} />

        :
        <MaterialIcons 
        name="timer" 
        size={24} 
        color={purpose === 'card' ? 'white' : 'black'} />
      }
      <Text style={{color: purpose === 'card' ? 'white' : 'black'}}>
        {
          difficulty === 'hard' ? '어려움' :
          difficulty === 'normal' ? '보통' :
          difficulty === 'easy' ? '쉬움' :
          people ? `${people}명` :
          time ? `${time}분` :
          null
        }
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  explainIcon: {
    justifyContent: "center",
    alignItems: "center",
    height: '6%',
  },
});
