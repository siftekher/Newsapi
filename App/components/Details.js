import * as React from 'react';
import { View, Text, TextInput, AsyncStorage, Image, Linking, ScrollView, Dimensions } from 'react-native';

var moment = require("moment");

class Details extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
		config : {
           deviceWidth: Dimensions.get('window').width,
           deviceHeight: Dimensions.get('window').height
        }
		
	};
  }


  render() {

    const { title } = this.props.navigation.state.params.data;

    return (
      <View style={{ backgroundColor: '#fff', flex: 1, flexDirection: 'row' }}>
	    <ScrollView>
           <Image
            source={{uri: title.urlToImage}}
            style={{width: '100%', height: this.state.config.deviceHeight * 0.5}} 
			/>
            <View style={{flexDirection: 'row', marginLeft: 2, marginRight:2, marginTop:'1%',}}>
			   <View style={{width: '80%', marginLeft: '2%'}}>
		          <Text style={{fontWeight: 'bold'}} onPress={ ()=>{ Linking.openURL(title.url)}}>{title.title}</Text>
			   </View>
			</View>
			
			<View style={{flexDirection: 'row', marginLeft: 2, marginRight:2, marginTop:'1%',}}>
			   <View style={{width: '40%', marginLeft: '2%'}}>
		          <Text >Date: { moment(title.publishedAt).format("DD/MM/YYYY")}</Text>
			   </View>
			   
			   <View style={{width: '30%', marginLeft: '2%'}}>
		          <Text>By: {title.author}</Text>
			   </View>
			</View>
		   
		    <View style={{flexDirection: 'row', marginLeft: 2, marginRight:2, marginTop:'1%',}}>
			   <View style={{width: '80%', marginLeft: '2%'}}>
                  <Text>{title.content}</Text>
			   </View>
			</View>
		</ScrollView>
      </View>
    )
  
  }
}

export default Details;