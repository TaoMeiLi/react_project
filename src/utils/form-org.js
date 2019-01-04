export const 	getFormOrg = (data, res, type) => {
  const {org, bid, brid, sid} = data;
  if (org) {
    if(type == 'checkbox') {
      const {org, bid, brid, sid} = data;
      if (org) {
        res.map(_o => {
          if (_o.id == bid) {
            if(brid) {
              _o['checked'] = false;
            }
            _o['branch'] =_o['branch'].map(_b => {
              if (_b.id == brid) {
                if(!sid && brid){
                  _b['checked'] = true;
                  _b['branch'] = _b['branch'].map(_s => {
                    _s['checked'] = true;
                    return _s;
                  })
                } else {
                  _b['branch'] = _b['branch'].map(_s => {
                    let _sid = sid.split(',');
                    if (_sid.findIndex((_itm) => _itm == _s.id) >= 0 ) {
                      _s['checked'] = true;
                    } else {
                      _s['checked'] = false;
                    }
                    return _s;
                  })
                }
                
              } else {
                _b['branch'] = _b['branch'].map(_s => {
                  _s['checked'] = false;
                  return _s;
                })
              }
              return _b;
            })
          } else {
            _o['branch'] = _o['branch'].map(_b => {
              _b['branch'] = _b['branch'].map(_s => {
                _s['checked'] = false;
                return _s;
              })
              return _b;
            })
          }
          return _o;
        })
      }
      
    } else {
      res.map(_o => {
        if (_o.id == bid) {
          _o['branch'] =_o['branch'].map(_b => {
            if (_b.id == brid) {
              _b['branch'] = _b['branch'].map(_s => {
                if (_s.id == sid) {
                  _s['checked'] = true;
                } else {
                  _s['checked'] = false;
                }
                return _s;
              })
            } else {
              _b['branch'] = _b['branch'].map(_s => {
                _s['checked'] = false;
                return _s;
              })
            }
            return _b;
          })
        } else {
          _o['branch'] = _o['branch'].map(_b => {
            _b['branch'] = _b['branch'].map(_s => {
              _s['checked'] = false;
              return _s;
            })
            return _b;
          })
        }
        return _o;
      })
    }
    
  }
  return res;
}
