from SugarcraneClass import SugarcaneDisease

# Config for V1
# "hidden_layers": [128, 64, 64, 32]
# "seed": 6985
# "batch_size": 8
# "epochs": 50

config_dir = './SugarcaneDisease/Model/config.json'
logs_dir = './SugarcaneDisease/Model/logs.json'
run = SugarcaneDisease(config_dir)
run.train()
run.save_log(logs_dir)

