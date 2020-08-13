import * as React from 'react';
import { View, Text, Image, Linking, ScrollView, Dimensions, StyleSheet } from 'react-native';

var moment = require("moment");


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', 
	flex: 1
  },
  halfContainer: {
    width: '50%',
  },
  OneFourthContainer: {
    width: '25%',
	marginLeft: '1%'
  },
  threeFourthContainer: {
    width: '75%',
	marginLeft: '1%'
  },
  
});

class Home extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
		isLoaded: 0,
		articles: [],
		config : {
           deviceWidth: Dimensions.get('window').width,
           deviceHeight: Dimensions.get('window').height
        }
	};
	

  }

  componentDidMount = async () => {
      const today = moment().format('YYYY-MM-DD');
      
      fetch("http://newsapi.org/v2/everything?q=bitcoin&from="+today+"&sortBy=publishedAt&apiKey=18b4a1bad67b46069728e33b57c539a9")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.setState({ articles: res.articles });
			this.setState({ isLoaded: 1 });
        })
        .catch(error => {
           console.log("Error from server :- \n", error);
        });
  }

  render() {
  if(this.state.isLoaded == 1) {
    return (
       <View style={styles.container}>
          <ScrollView>
          {
              this.state.articles.map((y, i) => {
                   return (
				     <View key={i} style={{ paddingBottom:'2%', flex: 1, paddingLeft: this.state.config.deviceWidth * 0.01  }}>
					   <View style={{flexDirection: 'row', marginLeft: '1%', marginRight:'1%', marginTop:'1%',width : this.state.config.deviceWidth * 0.8}}>
					      <View style={styles.OneFourthContainer}>
      					     <Image
                              source={{uri: y.urlToImage}}
                              style={{width: '100%', height: this.state.config.deviceHeight * 0.2 }} 
			                 />				          
					      </View>
					      
						  
						  <View style={styles.threeFourthContainer}>
						    <Text style={{fontWeight: 'bold'}} key={i} onPress={() => this.props.navigation.navigate('Details', { data: { title: y} })} >{y.title}</Text>
							<View style={{flexDirection: 'row'}}>
							   <View style={styles.halfContainer}>
						          <Text>{ moment(y.publishedAt).format("DD/MM/YYYY")}</Text>
							   </View>
							   <View style={styles.halfContainer}>
							      <Text>By:{ y.author}</Text>
							   </View>
							</View>
							<Text>{ y.description}</Text>
						  </View>
					   </View>
					 </View>
				   );
              })
          }
					
		  </ScrollView>
       </View>
	  
    );
  } else {
	 return (
	   <View>
	      <Text>Loading...</Text>
	   </View>
	 )  
  }
  }
}

export default Home;