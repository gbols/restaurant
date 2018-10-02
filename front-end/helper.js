const changeState = (elements,value) => {
  for(let i = 0; i < elements.length; i++){
    elements[i].style.display = value;
  }
}
