import React, { useMemo, useState } from 'react';
import { SafeAreaView, StatusBar, View, Text, ScrollView, Pressable, TextInput, StyleSheet, Alert } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

const C = { bg:'#171321', panel:'#211a2f', panel2:'#302844', violet:'#7560B9', lilac:'#D8C9F3', cream:'#F7F2E9', muted:'#aaa1bd', line:'#413650', white:'#fbf9ff' };
const movies = [
  {id:'1',title:'The Night We Dream',genre:'Drama',meta:'Drama · Placeholder',art:'#80518d',desc:'A catalogue placeholder. No licensed stream is connected yet.'},
  {id:'2',title:'Beyond the Blue',genre:'Sci-Fi',meta:'Sci-Fi · Placeholder',art:'#315f90',desc:'A catalogue placeholder. No licensed stream is connected yet.'},
  {id:'3',title:'Wildlight',genre:'Adventure',meta:'Adventure · Placeholder',art:'#a66c42',desc:'A catalogue placeholder. No licensed stream is connected yet.'},
  {id:'4',title:'Almost Famous Again',genre:'Comedy',meta:'Comedy · Placeholder',art:'#a45b91',desc:'A catalogue placeholder. No licensed stream is connected yet.'},
];
const tracks = [
  {id:'a',title:'Midnight Glow',artist:'Nova Lane · Dream pop',art:'#73519a'},
  {id:'b',title:'Golden Hour',artist:'Sol & June · Chill',art:'#9e526f'},
  {id:'c',title:'Open Skies',artist:'Arlo West · Indie',art:'#397c83'},
];
const tabs = ['Home','Explore','Music','My List','Profile'];
export default function App() {
  const [page,setPage] = useState('Home');
  const [query,setQuery] = useState('');
  const [genre,setGenre] = useState('All');
  const [saved,setSaved] = useState([]);
  const [playing,setPlaying] = useState(null);
  const visibleMovies = useMemo(() => movies.filter(m =>
    (page !== 'My List' || saved.includes(m.id)) &&
    (genre === 'All' || m.genre === genre) &&
    (m.title+' '+m.genre).toLowerCase().includes(query.toLowerCase())
  ),[page,saved,genre,query]);
  const toggleSave = id => setSaved(s => s.includes(id) ? s.filter(x=>x!==id) : [...s,id]);
  const showItem = item => Alert.alert(item.title, item.desc || 'Audio playback will be connected when licensed tracks and a streaming service are configured.');
  const title = ({Home:'Good evening, Explorer ✨',Explore:'Find your next favourite.',Music:'A soundtrack for every you.','My List':'Your saved world.',Profile:'Your LUMORA space.'})[page];
  const subtitle = ({Home:'A little wonder for whatever mood you’re in.',Explore:'Browse stories and sounds that fit your mood.',Music:'Discover fresh sounds, artists, and moods.','My List':'Everything you want to come back to.',Profile:'Your tastes, your lists, your settings.'})[page];
  return <SafeAreaView style={s.safe}>
    <StatusBar barStyle="light-content" backgroundColor={C.bg} />
    <ExpoStatusBar style="light" />
    <View style={s.header}><View style={s.brandMark}><Text style={s.star}>✦</Text></View><Text style={s.brand}>LUMORA</Text><Pressable style={s.headerBtn} onPress={()=>setPage('My List')}><Text style={s.headerBtnText}>♡ {saved.length}</Text></Pressable></View>
    <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
      <Text style={s.eyebrow}>YOUR WORLD, ILLUMINATED</Text>
      <Text style={s.h1}>{title}</Text><Text style={s.sub}>{subtitle}</Text>
      <TextInput value={query} onChangeText={setQuery} placeholder="Search movies, genres, artists…" placeholderTextColor={C.muted} style={s.search}/>
      {page==='Profile' ? <View style={s.panel}><Text style={s.sectionTitle}>Your profile</Text><Text style={s.body}>Profile sign-in and cloud sync are not connected in this starter build. Your saved list is held in app memory for this session.</Text><Text style={s.body}>Tagline: Your world, illuminated.</Text></View> : null}
      {page==='Home' || page==='Explore' ? <View style={s.hero}><Text style={s.eyebrow}>LUMORA · FEATURED</Text><Text style={s.heroTitle}>Great stories.{"\n"}Bigger dreams.</Text><Text style={s.body}>Step into stories that stay with you and sounds that move you.</Text><Pressable style={s.primary} onPress={()=>setPage('Explore')}><Text style={s.primaryText}>Explore featured →</Text></Pressable></View> : null}
      {page!=='Music' && page!=='Profile' ? <>
        <Text style={s.sectionTitle}>{page==='My List'?'Your saved titles':query?'Search results':'Trending this week'}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chips}>
          {['All','Drama','Sci-Fi','Adventure','Comedy'].map(g=><Pressable key={g} onPress={()=>setGenre(g)} style={[s.chip,genre===g&&s.chipActive]}><Text style={[s.chipText,genre===g&&s.chipTextActive]}>{g==='All'?'For you':g}</Text></Pressable>)}
        </ScrollView>
        <View style={s.grid}>{visibleMovies.map(m=><View key={m.id} style={s.movieCard}><View style={[s.poster,{backgroundColor:m.art}]}><Text style={s.posterSymbol}>✦</Text><Pressable onPress={()=>toggleSave(m.id)} style={s.saveBtn}><Text style={s.saveText}>{saved.includes(m.id)?'♥':'♡'}</Text></Pressable></View><Text style={s.movieTitle}>{m.title}</Text><Text style={s.meta}>{m.meta}</Text><Pressable style={s.outline} onPress={()=>showItem(m)}><Text style={s.outlineText}>View details</Text></Pressable></View>)}</View>
        {visibleMovies.length===0?<Text style={s.empty}>Nothing here yet. Try another search or save a title.</Text>:null}
      </> : null}
      {page==='Home'||page==='Music'||page==='Explore' ? <>
        <Text style={s.sectionTitle}>Sounds for your mood</Text>
        {tracks.filter(t=>(t.title+' '+t.artist).toLowerCase().includes(query.toLowerCase())).map(t=><Pressable key={t.id} style={s.track} onPress={()=>setPlaying(playing===t.id?null:t.id)}><View style={[s.album,{backgroundColor:t.art}]}><Text style={s.albumIcon}>♫</Text></View><View style={{flex:1}}><Text style={s.trackTitle}>{t.title}</Text><Text style={s.meta}>{t.artist}</Text></View><Text style={s.play}>{playing===t.id?'Ⅱ':'▶'}</Text></Pressable>)}
        <View style={s.panel}><Text style={s.eyebrow}>AFRICAN ROOTS. GLOBAL DISCOVERIES.</Text><Text style={s.sectionTitle}>A catalogue with care</Text><Text style={s.body}>Before any movie or track can stream in LUMORA, its redistribution and streaming rights must be verified. The demo cards above are placeholders, not playable licensed content.</Text></View>
      </> : null}
      <Text style={s.footer}>LUMORA · Your world, illuminated.</Text>
    </ScrollView>
    <View style={s.nav}>{tabs.map(t=><Pressable key={t} onPress={()=>{setPage(t);if(t!=='Explore')setQuery('')}} style={s.navItem}><Text style={[s.navIcon,page===t&&s.navSelected]}>{({Home:'⌂',Explore:'⌕',Music:'♫','My List':'♡',Profile:'◎'})[t]}</Text><Text style={[s.navLabel,page===t&&s.navSelected]}>{t}</Text></Pressable>)}</View>
  </SafeAreaView>;
}
const s=StyleSheet.create({
 safe:{flex:1,backgroundColor:C.bg},header:{height:58,paddingHorizontal:18,flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:C.line},brandMark:{width:28,height:28,borderRadius:9,backgroundColor:C.violet,alignItems:'center',justifyContent:'center'},star:{color:C.cream,fontSize:19},brand:{marginLeft:10,color:C.white,fontSize:18,fontWeight:'900',letterSpacing:3,flex:1},headerBtn:{borderWidth:1,borderColor:C.line,borderRadius:22,paddingHorizontal:13,paddingVertical:8},headerBtnText:{color:C.lilac,fontWeight:'700'},content:{padding:20,paddingBottom:28},eyebrow:{color:C.lilac,fontSize:10,fontWeight:'800',letterSpacing:2,marginBottom:8},h1:{fontSize:28,fontWeight:'800',color:C.white,letterSpacing:-.7},sub:{fontSize:13,color:C.muted,marginTop:6,marginBottom:15},search:{backgroundColor:C.panel,borderWidth:1,borderColor:C.line,borderRadius:13,paddingHorizontal:14,paddingVertical:11,color:C.white,marginBottom:18},hero:{padding:22,borderRadius:22,backgroundColor:'#40305c',marginBottom:22,borderWidth:1,borderColor:'#574374'},heroTitle:{fontSize:34,lineHeight:37,fontWeight:'900',color:C.white,marginVertical:7,letterSpacing:-1},body:{fontSize:13,color:'#d0c6e2',lineHeight:20,marginVertical:7},primary:{alignSelf:'flex-start',backgroundColor:C.lilac,paddingVertical:11,paddingHorizontal:16,borderRadius:22,marginTop:10},primaryText:{color:C.bg,fontWeight:'800'},sectionTitle:{fontSize:19,fontWeight:'800',color:C.white,marginTop:12,marginBottom:12},chips:{gap:8,paddingBottom:14},chip:{borderWidth:1,borderColor:C.line,borderRadius:20,paddingHorizontal:14,paddingVertical:9,backgroundColor:C.panel},chipActive:{backgroundColor:C.violet,borderColor:C.violet},chipText:{fontSize:12,color:C.soft},chipTextActive:{color:'#fff',fontWeight:'700'},grid:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'},movieCard:{width:'48%',marginBottom:19},poster:{height:178,borderRadius:14,justifyContent:'center',alignItems:'center',overflow:'hidden'},posterSymbol:{fontSize:48,color:'#ffffffb0'},saveBtn:{position:'absolute',top:8,right:8,width:34,height:34,borderRadius:18,backgroundColor:'#21172fc9',alignItems:'center',justifyContent:'center'},saveText:{fontSize:19,color:C.lilac},movieTitle:{fontSize:13,fontWeight:'800',color:C.white,marginTop:9},meta:{fontSize:11,color:C.muted,marginTop:4},outline:{borderWidth:1,borderColor:C.line,borderRadius:18,alignSelf:'flex-start',paddingHorizontal:11,paddingVertical:7,marginTop:8},outlineText:{color:C.lilac,fontSize:11,fontWeight:'700'},empty:{color:C.muted,textAlign:'center',padding:24},track:{flexDirection:'row',alignItems:'center',gap:12,padding:11,borderRadius:14,backgroundColor:C.panel,borderWidth:1,borderColor:C.line,marginBottom:9},album:{width:52,height:52,borderRadius:10,alignItems:'center',justifyContent:'center'},albumIcon:{fontSize:24,color:'#fff'},trackTitle:{fontSize:13,fontWeight:'800',color:C.white},play:{fontSize:17,color:C.lilac,paddingHorizontal:7},panel:{padding:17,backgroundColor:C.panel,borderWidth:1,borderColor:C.line,borderRadius:16,marginTop:22},footer:{color:C.muted,fontSize:11,textAlign:'center',marginTop:25},nav:{flexDirection:'row',justifyContent:'space-around',paddingTop:9,paddingBottom:10,backgroundColor:C.panel,borderTopWidth:1,borderTopColor:C.line},navItem:{alignItems:'center',gap:3,minWidth:52},navIcon:{fontSize:20,color:C.muted},navSelected:{color:C.lilac},navLabel:{fontSize:10,color:C.muted}
});
