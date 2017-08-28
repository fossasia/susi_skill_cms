
import Cookies from 'universal-cookie';
const cookies = new Cookies();
let colors;
if(cookies.get('settings')!==undefined){
	console.log(cookies.get('settings').theme);
	colors = {
    header: cookies.get('settings').theme === 'dark'?'#19324c':'#4285f4',
    fabButton : cookies.get('settings').theme === 'dark'?'#19324c':'#4285f4'
};
}
else {
	colors = {
    header: '#4285f4',
    fabButton : '#4285f4'
	};
}


export default colors
