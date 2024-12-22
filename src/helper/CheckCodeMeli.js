export const  checkCodeMeli = (code) => {
  const L=code.length;
  if(L !== 10 || parseInt(code,10)===0) return false;
  code=(`0000${code}`).substr(L+4-10);
  if(parseInt(code.substr(3,6),10)===0) return false;
  const c=parseInt(code.substr(9,1),10);
  let s=0;
  for(let i=0;i<9;i++)
    s+=parseInt(code.substr(i,1),10)*(10-i);
  s%=11;
  return (s<2 && c===s) || (s>=2 && c===(11-s));
}