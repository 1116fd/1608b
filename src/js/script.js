var myswiper = new Swiper(".swiper-container", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    }
})

var myscroll = new BScroll("#wrapper", {
    click: true,
    probeType: 2
})
myscroll.on("scroll", function() {
    if (this.y < this.maxScrollY - 50) {
        $("#dwon").html("释放加载更多").addClass("flip");
    } else if (this.y < this.maxScrollY - 10) {
        $("#dwon").html("上拉加载").removeClass("flip");
    } else if (this.y > 50) {
        $("#up").html("释放刷新").addClass("flip");
    } else if (this.y > 10) {
        $("#up").html("下拉刷新").removeClass("flip");
    }
})
myscroll.on("scrollEnd", function() {
    if ($("#dwon").hasClass("flip")) {
        $("#dwon").removeClass("flip");
        dwon();
    } else if ($("#up").hasClass("flip")) {
        $("#up").removeClass("flip");
        up()
    }
})

function dwon() {
    render();
}

function up() {
    $("#first").html("")
    render();
}

render()

function render() {
    $.ajax({
        url: "/api/list",
        success: function(res) {
            var res = JSON.parse(res);
            if (res.code == "1") {
                //console.log(res.data.title)
                var str = "";
                $.each(res.data.title, function(i, v) {
                    str += `<div class="box">
                        <div class="boxleft"><img src="img/${v.img}" alt=""></div>
                        <div class="boxcenter">
                            <h3>${v.name}</h3>
                            <p>${v.add}精品烤鸭3-4人一份</p>
                            <p><span>398元</span>门市价：498元</p>
                        </div>
                        <div class="boxright">
                            <span>已售${v.shop}</span>
                        </div>
                    </div>`
                })
                $(".first").append(str)
            }
        }
    })
}