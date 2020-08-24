pragma solidity >=0.4.22 <0.6.0;
contract Authentitation{
    uint numUsers; //系统用户数量
    uint flag; //执行结果标记
    struct User{
        string name; //用户名
        bytes32 password; //用户密码
        // string role; //用户角色
        bool hasRegistered; //用户注册状态
        bool hasLogin; //用户登录状态
    }
    mapping(address => User) private addressToUser; //地址到用户信息的映射

    event Register(address _add);
    event Login(address _add);
    event Modify(address _add);
    event Logout(address _add);
    event Transfer(address _from, address _to, uint _amount); 

    constructor() public{
        //构造函数
        numUsers = 0;
    }

    function register(string memory _name, string memory _password) public{
        //注册函数
        require(!addressToUser[msg.sender].hasRegistered); //用户状态为未注册才能进行注册操作
        addressToUser[msg.sender] = User(_name, sha256(abi.encodePacked(_password)), true, false); 
        numUsers++;
        addressToUser[msg.sender].hasRegistered = true;
        emit Register(msg.sender);
    }

    function login(string memory _name, string memory _password) public{
        //登陆函数
        require(addressToUser[msg.sender].hasRegistered); //用户状态为已注册才能进行登录操作
        //用户名、密码全部匹配成功才能成功登录
        require(keccak256(abi.encodePacked(addressToUser[msg.sender].name)) == keccak256(abi.encodePacked(_name)) && addressToUser[msg.sender].password == sha256(abi.encodePacked(_password)));
        addressToUser[msg.sender].hasLogin = true;
        emit Login(msg.sender);
    }

    function modify(string memory _newName, string memory _newPassword) public{
        //用户身份信息修改
        require(addressToUser[msg.sender].hasLogin); //用户状态为已登录才能进行修改操作
        addressToUser[msg.sender].name = _newName;
        addressToUser[msg.sender].password = sha256(abi.encodePacked(_newPassword));
        emit Modify(msg.sender);
    }

    function logout() public{
        //注销账号
        require(addressToUser[msg.sender].hasLogin && addressToUser[msg.sender].hasRegistered); //已注册且已登录
        addressToUser[msg.sender].hasLogin = false;
        delete addressToUser[msg.sender];
        numUsers--;
        emit Logout(msg.sender);
    }

    function transfer(address payable _to) payable public{
        //转账函数
        require(addressToUser[msg.sender].hasLogin);//成功登录的前提下才能转账
        require(msg.sender.balance >= msg.value); //余额大于等于转账金额
        _to.transfer(msg.value); //向_to地址转账
        emit Transfer(msg.sender, _to, msg.value);
    }


}