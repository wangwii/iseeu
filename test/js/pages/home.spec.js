import HomePage from 'pages/home';

describe('HomePage', () =>{
  const page = shallow(<HomePage />);

  it('renders as a div', ()=>{
    expect(page.type()).to.eql('div');
  });

  it('has style with height 100%', ()=>{
    expect(page.prop('style')).to.eql({
      height: '100%'
    });
  });

  it('contains a header and has class name with welcome', ()=>{
    expect(page.find('.welcome-header')).to.have.length(1);
  });
});