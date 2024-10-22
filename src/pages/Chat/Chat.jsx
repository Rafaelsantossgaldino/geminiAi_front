import React, { useState } from "react";
import { TextField, Box, Typography, IconButton } from '@mui/material'
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import AutoAwesomeTwoToneIcon from '@mui/icons-material/AutoAwesomeTwoTone';
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { apiMessage } from "../../services/appi";

const typeChat = {
  0: yup.object().shape({
    inputMessage: yup.string().required("Pegunte alguma coisa!"),
  }),
};

const Chat = () => {
  const [responseMessage, setResponseMessage] = useState("");

  const methods = useForm({
    defaultValues: {
      inputMessage: "",
    },
    resolver: yupResolver(typeChat[0]),
  });

  const {
    register: registerType,
    handleSubmit: handleSubmitType,
    resetField,
    watch,
    formState: { errors: errorsType },
  } = methods;
  
  const mensagem = watch("inputMessage");  
  console.log(">>> INPUT_TEXT", mensagem);

  const sendMutation = useMutation({
    mutationKey: ["message"],
    mutationFn: async (data) => {
      const response = await apiMessage.post("/generation", data);
      return response.data;
    },
    onSuccess: (data) => {
      // console.log("Resposta requisicao", data);
      toast.success("Resposta gerada!");
      resetField("inputMessage");
      setResponseMessage(data.data);
    },
  });
  
  const sendMessage = (data) => {
    if (!data.inputMessage) {
      return; // Não envie a requisição se o campo estiver vazio
    }
    const payload = {
      message : data.inputMessage,
    };
    sendMutation.mutate(payload);
    resetField("inputMessage");
  };

  React.useEffect(() => {
    if (Object.keys(errorsType).length > 0) {
      if (errorsType.inputMessage) {
        toast.error(errorsType.inputMessage.message);
      }
    }
  }, [errorsType]);
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{
        // Ajusta a largura e altura com base na tela
        width: { xs: "100%", sm: "100%", md: "100%" },
        height: { xs: "auto", md: "40%" },
        marginTop: { xs: "50%", md: "10%" },
      }}
    >

      <Typography 
        variant="h6" 
        sx={{ 
          position: 'absolute', 
          top: 16, 
          left: 16, 
          color: '#3A416F',
          marginTop: "50px",
          marginLeft: "50px",  
        }}
      >
        <strong>Galdino GPT-2.0</strong>
        <IconButton>
          <AutoAwesomeTwoToneIcon sx={{ fontSize: 28, color: "red"}} />
        </IconButton>
      </Typography>

      <Box sx={{ color: "#3A416F", mb: 5 }}>
        {responseMessage ? (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
            }}
          >
            <Box
              sx={{
                width: { xs: "90%", md: "60%" }, // Define a largura do box da resposta
                height: "auto",
                backgroundColor: "#010101",
                color: "white",
                padding: 2,
                borderRadius: "8px",
                boxShadow: 1,
                textAlign: "center", // Centraliza o texto
                margin: "0 auto", // Centraliza o box na tela
              }}
            >
              <Typography variant="h8">
                {responseMessage}
              </Typography>
            </Box>
          </motion.div>
        ) : (
          <Typography variant="h5" mb={5}>
            <strong>Como posso ajudá-lo?</strong>
          </Typography>
        )}
      </Box>

      <Box sx={{ position: "relative", width: { xs: "90%", sm: "70%", md: "30%" }, height: "40%" }}>
        <FormProvider {...methods}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
          component={"form"}
          onSubmit={handleSubmitType(sendMessage)}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Galdino GPT-2.0" 
            sx={{
              borderRadius: "18px",
              width: "100%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray", // Cor padrão
                },
                "&:hover fieldset": {
                  borderColor: "gray", // Cor ao passar o mouse
                },
                "&.Mui-focused fieldset": {
                  borderColor: "gray", // Cor ao focar
                },
                padding: { xs: "12px", md: "10px" }, // Ajusta o padding para diferentes tamanhos de tela
                minHeight: { xs: "60px", md: "auto" },// Define uma altura mínima para telas menores
                "& input": {
                  padding: "10px", // Aumenta o espaço interno do input
                },
              },
            }}  
            multiline
            rows={3}
            {...registerType("inputMessage")}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmitType(sendMessage)();
                }
              }}
            InputProps={{
              sx: {
                padding: "10px", // Aumenta o espaço interno do TextField
                paddingBottom: "40px",
                borderRadius: "18px",
              },
              endAdornment: (
                <IconButton 
                  onClick={handleSubmitType(sendMessage)}
                  title="Enviar mensagem" 
                  sx={{
                    position: "absolute",
                    bottom: 8,  // Ajusta a posição vertical (espessura da borda considerada)
                    right: 8,
                  }}
                >
                  <ArrowCircleUpTwoToneIcon sx={{ fontSize: 28 }} />
                </IconButton>
              ),
            }}
          />
        </Box>
        </FormProvider>
      </Box>
      <Box
        component="footer"
        sx={{
          marginTop: "280px",  // Pushes the footer to the bottom
          padding: 2,
          textAlign: "center",
          backgroundColor: "#f4f4f4",
          width: "100%",
        }}
      >
        <Typography variant="body2" sx={{ color: "gray" }}>
          Galdino GPT-2.0 pode cometer erros. Considere verificar informações importantes.
        </Typography>
      </Box>  
    </Box>
  );
}

export default Chat