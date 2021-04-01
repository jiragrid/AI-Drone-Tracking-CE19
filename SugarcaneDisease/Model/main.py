from SugarcraneClass import SugarcaneDisease

y_true = [0]*45 + [1]*45 + [2]*45 + [3]*45
config_dir = './SugarcaneDisease/Model/config.json'
logs_dir = './SugarcaneDisease/Model/logs.json'
run = SugarcaneDisease(config_dir)
# run.train()
# run.save_log(logs_dir)
run.test(y_true)

