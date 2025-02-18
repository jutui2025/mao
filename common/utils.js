/**
 * 获取权限
 * @param {Object} params - 参数对象
 * @param {string} params.permission - 对应权限的scope，例如 'bluetooth'
 * @param {string} params.permissionName - 提示框显示的权限名称，例如 '蓝牙'
 * @param {boolean} [params.customPopup=false] - 是否使用自定义弹窗代替系统弹窗
 * @param {Function} [params.success] - 授权成功回调函数
 * @param {Function} [params.fail] - 授权失败回调函数
 * @param {Function} [params.cancel] - 取消继续授权回调函数
 */
function getPermission(params) {
    const permissionScope = `scope.${params.permission}`;
    const tipsContent = `您拒绝了${params.permissionName}权限，将导致部分功能不能正常使用，去设置权限？`;

    function handleFailure() {
        if (params.customPopup && typeof params.customPopup === 'function') {
            params.customPopup(tipsContent, handleSetting);
        } else {
            uni.showModal({
                title: '权限请求',
                content: tipsContent,
                success: res => {
                    if (res.confirm) {
                        uni.openSetting();
                    } else {
                        params.cancel && params.cancel();
                    }
                }
            });
        }
    }

    function handleSetting() {
        uni.openSetting({
            success: (settingRes) => {
                if (settingRes.authSetting[permissionScope]) {
                    params.success && params.success();
                } else {
                    params.fail && params.fail();
                }
            }
        });
    }

    uni.getSetting({
        success(res) {
            if (res.authSetting.hasOwnProperty(permissionScope)) {
                if (!res.authSetting[permissionScope]) {
                    handleFailure();
                } else {
                    params.success && params.success();
                }
            } else {
                uni.authorize({
                    scope: permissionScope,
                    success: params.success,
                    fail: handleFailure
                });
            }
        },
        fail: params.fail
    });
}

module.exports = {
    getPermission,
};
